import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-8">
      <div className="absolute inset-0 -z-10 bg-[#F0FAF4]"/>
      <div className="absolute inset-0 -z-0 opacity-70 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(6,78,59,0.10),transparent),radial-gradient(1000px_500px_at_90%_10%,rgba(52,211,153,0.15),transparent)]" />
      <div className="grid lg:grid-cols-2 gap-8 w-[min(1100px,92vw)] mx-auto">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-900 tracking-tight mb-4">Modern Serenity 2025</h1>
          <p className="text-emerald-800/80 text-base sm:text-lg mb-6">FinTech inspirasan, miran i pregledan interfejs za evidenciju članarina i donacija Islamskog Centra u Lugu.</p>
          <div className="flex gap-3">
            <a href="#dashboard" className="rounded-full bg-emerald-700 text-white px-5 py-2.5 text-sm font-semibold shadow-[0_10px_30px_rgba(6,78,59,0.35)] hover:bg-emerald-800 transition">Otvori Dashboard</a>
            <a href="#unos" className="rounded-full bg-[#D4AF37] text-emerald-950 px-5 py-2.5 text-sm font-semibold shadow-[0_10px_30px_rgba(212,175,55,0.35)] hover:brightness-95 transition">Nova Uplata</a>
          </div>
        </div>
        <div className="relative aspect-[4/3] order-1 lg:order-2 rounded-3xl overflow-hidden border border-emerald-900/10 shadow-[0_20px_80px_rgba(6,78,59,0.25)] bg-white/40 backdrop-blur-xl">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" />
        </div>
      </div>
    </section>
  );
}
