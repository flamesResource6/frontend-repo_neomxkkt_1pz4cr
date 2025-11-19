import { User, LogIn } from "lucide-react";

export default function Header({ user, onLogin }) {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,92vw)]">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-[0_8px_30px_rgba(6,78,59,0.2)] rounded-full px-4 py-2 flex items-center justify-between">
        <div className="font-semibold tracking-tight text-emerald-900">Islamski Centar u Lugu</div>
        <button
          onClick={onLogin}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 transition shadow-[0_0_0_2px_rgba(255,255,255,0.2)_inset]"
        >
          <span className="text-sm">{user ? user.initials : "Prijava"}</span>
          {user ? <User size={16} /> : <LogIn size={16} />}
        </button>
      </div>
    </header>
  );
}
