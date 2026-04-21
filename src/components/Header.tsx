import logo from '../assets/logo-centered.png'

export function Header() {
  return (
    <header className="w-full bg-white border-b-2 border-dark">
      <div className="max-w-[1024px] mx-auto px-4 flex items-center justify-between py-5">
        <img src={logo} alt="My Studies" className="h-12" />
        <nav className="flex gap-10">
          {["cards", "assuntos", "estudos"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-dark text-lg font-bold transition-colors duration-200 hover:text-primary"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
