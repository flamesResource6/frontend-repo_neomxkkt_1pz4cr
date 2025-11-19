import { useEffect, useMemo, useState } from "react";
import { Euro, CircleDollarSign } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "https://" + location.host.replace("-3000", "-8000");

const fx = 117; // 1 EUR = 117 RSD

function FloatingInput({ label, type = "text", value, onChange }) {
  return (
    <label className="relative block">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full px-4 py-3 rounded-2xl border border-emerald-900/10 bg-white/70 backdrop-blur placeholder-transparent focus:outline-none focus:ring-2 ring-emerald-500 text-emerald-900"
      />
      <span className="pointer-events-none absolute left-3 top-2.5 px-1 text-emerald-900/70 bg-white/70 rounded-md transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-emerald-900/50 peer-placeholder-shown:bg-transparent peer-focus:top-2.5 peer-focus:text-emerald-900/70 peer-focus:bg-white/70 text-sm">
        {label}
      </span>
    </label>
  );
}

export default function Forms() {
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState(10);
  const [currency, setCurrency] = useState("EUR");

  const rsd = useMemo(() => currency === "EUR" ? amount * fx : amount, [amount, currency]);
  const eur = useMemo(() => currency === "RSD" ? (amount / fx) : amount, [amount, currency]);

  const submit = async (e) => {
    e.preventDefault();
    // Create member, then payment for current month/year
    const memberRes = await fetch(`${API}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: memberName })
    }).then(r=>r.json());

    const now = new Date();
    await fetch(`${API}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        member_id: memberRes.id,
        year: now.getFullYear(),
        month: now.getMonth()+1,
        amount: parseFloat(eur.toFixed(2)),
        currency: 'EUR'
      })
    });

    setMemberName("");
  };

  return (
    <section id="unos" className="w-[min(1100px,92vw)] mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl p-6 bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_rgba(6,78,59,0.15)]">
          <h3 className="text-emerald-900 font-semibold mb-4">Brza Uplata</h3>
          <form onSubmit={submit} className="grid gap-3">
            <FloatingInput label="Ime i Prezime" value={memberName} onChange={e=>setMemberName(e.target.value)} />

            <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
              <FloatingInput label="Iznos" type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value||0))} />
              <div className="flex rounded-2xl overflow-hidden border border-emerald-900/10">
                {['EUR','RSD'].map(c => (
                  <button type="button" key={c} onClick={()=>setCurrency(c)} className={`px-3 py-2 text-sm font-medium ${currency===c? 'bg-emerald-700 text-white':'bg-white/70 text-emerald-900'}`}>{c}</button>
                ))}
              </div>
            </div>

            <div className="text-sm text-emerald-900/70 flex items-center gap-2">
              <Euro size={16} /> 1 EUR = 117 RSD
            </div>

            <button className="mt-2 rounded-full bg-emerald-700 text-white px-5 py-2.5 text-sm font-semibold shadow-[0_10px_30px_rgba(6,78,59,0.35)] hover:bg-emerald-800 transition">Sačuvaj</button>
          </form>
        </div>

        <div className="rounded-3xl p-6 bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_rgba(6,78,59,0.15)]">
          <h3 className="text-emerald-900 font-semibold mb-2">Preračun</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-emerald-900/80">
            <div className="rounded-2xl p-4 bg-emerald-50">{eur.toFixed(2)} EUR</div>
            <div className="rounded-2xl p-4 bg-emerald-50">{rsd.toFixed(2)} RSD</div>
          </div>
          <div className="mt-3 text-xs text-emerald-900/60">Unos u bazu se trenutno čuva u EUR radi konsistencije.</div>
        </div>
      </div>
    </section>
  );
}
