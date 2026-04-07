const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🏔️</div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
            Tervetuloa Muumilaaksoon!
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            MuumiRent on Suomen ensimmäinen ja suurin muumipukujen vuokrauspalvelu! 
            Tarjoamme korkealaatuisia, mukavia ja tunnistettavia pukuja kaikista rakastetuista muumihahmoista.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            Oli kyseessä sitten lasten syntymäpäivät, teemajuhlat, Halloween, karnevaalit, 
            messuosasto tai yritystapahtuma — meiltä löydät täydellisen puvun joka tilanteeseen!
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            <strong className="text-primary">Miksi ostaa kallis puku, kun voit vuokrata sen murto-osalla hinnasta?</strong> 
            Pukumme ovat ammattilaatuisia, puhtaita ja huollettuja. Varaa helposti verkossa! 🎉
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;