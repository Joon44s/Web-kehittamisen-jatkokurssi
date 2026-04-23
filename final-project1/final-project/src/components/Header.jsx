import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo - Klikkaamalla palaa aina etusivulle */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-4xl bounce-gentle">🎭</div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary">MuumiRent</h1>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-semibold items-center">
            <li><a href="/#home" className="hover:text-primary transition">Etusivu</a></li>
            <li><a href="/#about" className="hover:text-primary transition">Tietoa</a></li>
            <li><a href="/#puvut" className="hover:text-primary transition">Katalogi</a></li>
            <li><a href="/#yhteystiedot" className="hover:text-primary transition">Yhteystiedot</a></li>
            
            {/* Uusi: Tilaa Puku -painike */}
            <li>
              <Link 
                to="/order" 
                className="bg-accent hover:bg-orange-400 text-gray-900 px-6 py-2 rounded-full font-bold transition transform hover:scale-105 shadow-md"
              >
                Tilaa Puku 📝
              </Link>
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 text-2xl" aria-label="Avaa valikko">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden absolute top-full left-0 w-full bg-white shadow-md text-center pb-4">
            <li><a href="/#home" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:text-primary transition">Etusivu</a></li>
            <li><a href="/#about" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:text-primary transition">Tietoa</a></li>
            <li><a href="/#puvut" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:text-primary transition">Katalogi</a></li>
            <li><a href="/#yhteystiedot" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:text-primary transition">Yhteystiedot</a></li>
            <li className="pt-2">
              <Link 
                to="/order" 
                onClick={() => setIsOpen(false)} 
                className="inline-block bg-accent hover:bg-orange-400 text-gray-900 px-6 py-2 rounded-full font-bold transition"
              >
                Tilaa Puku 📝
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;