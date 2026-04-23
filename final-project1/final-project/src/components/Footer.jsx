const Footer = () => {
  return (
    <footer id="yhteystiedot" className="bg-gray-900 text-gray-300 py-12 text-center md:text-left">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Osa 1: Logo ja Some */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4 text-center md:text-left">
              <div className="text-3xl">🎭</div>
              <h3 className="text-2xl font-display font-bold text-white">MuumiRent</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Suomen suosituin ja suurin muumipukujen vuokrauspalvelu.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition text-2xl" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition text-2xl" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition text-2xl" aria-label="TikTok">
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition text-2xl" aria-label="Pinterest">
                <i className="fa-brands fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Osa 2: Pikalinkit */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Pikalinkit</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-primary transition">Etusivu</a></li>
              <li><a href="#about" className="hover:text-primary transition">Tietoa meistä</a></li>
              <li><a href="#edut" className="hover:text-primary transition">Palvelumme</a></li>
              <li><a href="#puvut" className="hover:text-primary transition">Pukukatalogi</a></li>
              <li><a href="#yhteystiedot" className="hover:text-primary transition">Yhteystiedot</a></li>
            </ul>
          </div>

          {/* Osa 3: Yhteystiedot */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 ">Yhteystiedot</h4>
            <ul className="space-y-3 text-center md:text-left">
              <li className="flex flex-col items-center md:flex-row md:items-start">
                <i className="fa-solid fa-location-dot text-primary mb-2 md:mb-0 md:mr-3"></i>
                <span>Muumikatu 123<br />00100 Helsinki</span>
              </li>

              <li className="flex flex-col items-center md:flex-row md:items-center">
                <i className="fa-solid fa-phone text-primary mb-2 md:mb-0 md:mr-3"></i>
                <a href="tel:+358501234567" className="hover:text-primary transition">+358 50 123 4567</a>
              </li>

              <li className="flex flex-col items-center md:flex-row md:items-center">
                <i className="fa-solid fa-envelope text-primary mb-2 md:mb-0 md:mr-3"></i>
                <a href="mailto:info@muumirent.fi" className="hover:text-primary transition">info@muumirent.fi</a>
              </li>
            </ul>
          </div>

          {/* Osa 4: Aukioloajat */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Aukioloajat</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Ma-Pe:</span>
                <span className="text-white">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>La:</span>
                <span className="text-white">10:00 - 15:00</span>
              </li>
              <li className="flex justify-between">
                <span>Su:</span>
                <span className="text-white">Suljettu</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              <i className="fa-solid fa-calendar-check text-primary mr-2"></i>
              Verkkovaraus 24/7
            </p>
          </div>
        </div>

        {/* Alareuna */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 MuumiRent. Kaikki oikeudet pidätetään.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition">Tietosuoja</a>
              <a href="#" className="hover:text-primary transition">Käyttöehdot</a>
              <a href="#" className="hover:text-primary transition">Evästeet</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;