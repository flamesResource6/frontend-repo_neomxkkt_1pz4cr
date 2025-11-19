import { Users, Wallet, TrendingUp, PiggyBank } from "lucide-react";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "https://" + location.host.replace("-3000", "-8000")

function StatCard({ title, value, icon: Icon, glow }) {
  return (
    <div className={`rounded-3xl p-5 bg-white/60 backdrop-blur-xl border ${glow} border-white/40 shadow-[0_10px_40px_rgba(6,78,59,0.15)]`}> 
      <div className="flex items-center justify-between mb-3">
        <span className="text-emerald-900/80 text-sm font-medium">{title}</span>
        <Icon className="text-emerald-900/60" size={18} />
      </div>
      <div className="text-3xl font-extrabold text-emerald-900 tracking-tight">{value}</div>
      <div className="mt-2 h-6 bg-gradient-to-r from-emerald-200/60 to-emerald-100/40 rounded-full"/>
    </div>
  );
}

export default function Dashboard() {
  const [year] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState({ members: 0, payments_year: 0, donations_total: 0 });

  useEffect(() => {
    fetch(`${API}/stats/summary?year=${year}`).then(r=>r.json()).then(setSummary).catch(()=>{});
  }, [year]);

  return (
    <section id="dashboard" className="w-[min(1100px,92vw)] mx-auto pb-10">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <StatCard title="Ukupno Članova" value={summary.members} icon={Users} glow="shadow-[0_0_30px_rgba(6,78,59,0.15)]" />
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-3">
          <StatCard title={`Uplate ${year}`} value={`${summary.payments_year}€`} icon={Wallet} glow="shadow-[0_0_30px_rgba(52,211,153,0.25)]" />
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-3">
          <StatCard title="Donacije" value={`${summary.donations_total}€`} icon={PiggyBank} glow="shadow-[0_0_30px_rgba(212,175,55,0.25)]" />
        </div>
        <div className="col-span-12">
          <div className="rounded-3xl p-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(6,78,59,0.15)]">
            <div className="text-emerald-900/80 text-sm font-medium mb-3 flex items-center justify-between">
              <span>Trend uplatа kroz godinu</span>
              <span className="text-xs">Modern Serenity 2025</span>
            </div>
            <div className="h-40 bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-2xl"/>
          </div>
        </div>
      </div>
    </section>
  );
}
