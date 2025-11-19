import Hero from './components/Hero'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import DataGrid from './components/DataGrid'
import Forms from './components/Forms'

function App() {
  const user = { initials: 'IC' }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-[#F0FAF4]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(6,78,59,0.10),transparent),radial-gradient(1000px_500px_at_90%_10%,rgba(52,211,153,0.15),transparent)]" />
      <Header user={user} onLogin={()=>{}} />
      <main className="relative">
        <Hero />
        <Dashboard />
        <div className="w-[min(1100px,92vw)] mx-auto py-2">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-900/20 to-transparent" />
        </div>
        <DataGrid />
        <Forms />
        <footer className="w-[min(1100px,92vw)] mx-auto py-10 text-emerald-900/60 text-sm">Modern Serenity 2025 • Islamski Centar u Lugu</footer>
      </main>
    </div>
  )
}

export default App
