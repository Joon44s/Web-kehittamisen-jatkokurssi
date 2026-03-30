const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/kuva1.webp" 
          alt="Ihmisiä iloisissa muumipuvuissa juhlimassa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white fade-in-up">
        <div className="text-6xl sm:text-7xl lg:text-8xl mb-6 animate-bounce">🌟</div>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
          Ryhdy muumiksi!
        </h2>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-8 font-light max-w-3xl mx-auto">
          Vuokraa unelmiesi muumipuku — täydellinen ratkaisu juhliin, Halloweeniin ja hauskanpitoon! 🎉
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#yhteystiedot" className="bg-accent hover:bg-orange-400 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-lg">
            Tee Tilaus Nyt 📝
          </a>
          <a href="#puvut" className="bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition border-2 border-white">
            Katso Katalogi 🎭
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <i className="fa-solid fa-chevron-down text-white text-3xl"></i>
      </div>
    </section>
  );
};

export default Hero;