import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "https://" + location.host.replace("-3000", "-8000");

const months = ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"];

export default function DataGrid() {
  const [year] = useState(new Date().getFullYear());
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`${API}/stats/matrix?year=${year}`).then(r=>r.json()).then(setRows).catch(()=>{});
  }, [year]);

  const filtered = useMemo(() => rows.filter(r => r.full_name.toLowerCase().includes(q.toLowerCase())), [rows, q]);

  return (
    <section className="w-[min(1100px,92vw)] mx-auto" id="grid">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-emerald-900 font-semibold">Evidencija Uplata</h2>
        <div className="relative">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pretraga…" className="pl-9 pr-3 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 text-sm outline-none focus:ring-2 ring-emerald-500"/>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-900/60"/>
        </div>
      </div>

      <div className="relative overflow-auto rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_10px_40px_rgba(6,78,59,0.15)]">
        <div className="min-w-[900px]">
          <div className="sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 text-emerald-900 text-sm font-medium grid grid-cols-[220px_repeat(12,80px)_120px]">
            <div className="sticky left-0 z-20 px-4 py-3 bg-gradient-to-r from-white/70 to-white/0 backdrop-blur border-b border-white/50">Ime i Prezime</div>
            {months.map((m,i)=> (
              <div key={m} className="px-2 py-3 border-b border-white/50 text-center">{m}</div>
            ))}
            <div className="sticky right-0 z-20 px-4 py-3 bg-gradient-to-l from-white/70 to-white/0 backdrop-blur border-b border-white/50 text-right">Zbir</div>
          </div>

          {filtered.map((r, idx) => (
            <div key={r.id || idx} className="relative group grid grid-cols-[220px_repeat(12,80px)_120px] items-center text-sm text-emerald-900/90 border-b border-white/40 hover:bg-emerald-50/40">
              <div className="sticky left-0 z-10 px-4 py-2 bg-gradient-to-r from-white/70 to-white/0 backdrop-blur font-medium group-hover:text-emerald-900">{r.full_name}</div>
              {r.months.map((v,i)=> (
                <div key={i} className="px-2 py-2 text-center text-emerald-900/80 group-hover:text-emerald-900">{v ? `${v}€` : ""}</div>
              ))}
              <div className="sticky right-0 z-10 px-4 py-2 bg-gradient-to-l from-white/70 to-white/0 backdrop-blur text-right font-semibold text-emerald-900">{r.total ? `${r.total.toFixed(2)}€` : "0.00€"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-3 md:hidden mt-4">
        {filtered.map((r, idx)=> (
          <div key={r.id || idx} className="rounded-2xl p-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_rgba(6,78,59,0.15)]">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-emerald-900">{r.full_name}</div>
              <div className="text-emerald-900 font-bold">{r.total.toFixed(2)}€</div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {r.months.map((v,i)=> v ? (
                <span key={i} className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs">{months[i]} {v}€</span>
              ) : null)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
