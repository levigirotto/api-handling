import Logo from "/logo-no-background.png"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center bg-zinc-950 justify-center w-full py-4">
      <div className="container mx-auto px-4 flex justify-center">
        <img src={Logo} alt="Website Logo" className="h-8 w-auto absolute left-4" />
        <h1 className="py-0.5 text-xl font-semibold text-zinc-50">API Cards</h1>
      </div>
    </header>
  )
}
