const CallToAction = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-moomin to-blue-100 rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="/images/kuva8.webp" 
                alt="Iloisia ihmisiä muumipuvuissa juhlimassa yhdessä" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                Tee Juhlista Ikimuistoiset!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Varaa muumipukusi jo tänään ja saat 10% alennuksen ensimmäisestä vuokrauksesta 
                koodilla: <strong className="text-primary">MUUMI10</strong>
              </p>
              <div className="space-y-4">
                <a href="#yhteystiedot" className="block w-full bg-accent hover:bg-orange-400 text-gray-900 text-center font-bold py-4 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-lg">
                  Varaa Nyt 🎭
                </a>
                {/* Huom: Linkki vaihdettu osoittamaan #puvut-osioon, jotta se toimii tällä yhdellä sivulla */}
                <a href="#puvut" className="block w-full bg-primary hover:bg-secondary text-white text-center font-bold py-4 px-8 rounded-full text-lg transition">
                  Siirry Katalogiin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;