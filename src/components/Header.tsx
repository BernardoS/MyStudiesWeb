import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-centered.png'

export function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full bg-white border-b-2 border-dark">
      <div className="max-w-[1024px] mx-auto px-4 flex items-center justify-between py-5">
        <img
          src={logo}
          alt="My Studies"
          className="h-12 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <nav className="flex gap-10">
          {["cards"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-dark text-lg font-bold transition-colors duration-200 hover:text-primary"
            >
              {link}
            </a>
          ))}
          <button
            type="button"
            onClick={() => navigate('/assuntos')}
            className="text-dark text-lg font-bold transition-colors duration-200 hover:text-primary cursor-pointer bg-transparent border-none p-0"
          >
            assuntos
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-dark text-lg font-bold transition-colors duration-200 hover:text-primary cursor-pointer bg-transparent border-none p-0"
          >
            estudos
          </button>
        </nav>
      </div>
    </header>
  )
}
