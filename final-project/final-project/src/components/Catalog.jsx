const costumes = [
  { name: "Muumipeikko", price: "45€", img: "/images/kuva2.webp", color: "from-blue to-blue-100", icon: "💙", badge: "⭐ Suosituin" },
  { name: "Muumimamma", price: "50€", img: "/images/kuva3.webp", color: "from-pink to-pink-100", icon: "💕" },
  { name: "Muumipappa", price: "50€", img: "/images/kuva4.webp", color: "from-yellow-50 to-yellow-100", icon: "🎩", badge: "⭐ Miesten Suosikki!" },
  { name: "Nipsu", price: "45€", img: "/images/kuva5.webp", color: "from-red-50 to-red-100", icon: "🔴" },
  { name: "Nuuskamuikkunen", price: "45€", img: "/images/kuva6.webp", color: "from-green-50 to-green-100", icon: "🌲" },
  { name: "Niiskuneiti", price: "55€", img: "/images/kuva7.webp", color: "from-purple-50 to-purple-100", icon: "👸", badge: "⭐ Tyttöjen Suosikki" },
];

const Catalog = () => {
  return (
    <section id="puvut" className="py-20 bg-gradient-to-b from-moomin to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-5xl mb-4">🎭</div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
            Suosituimmat Muumipukumme
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {costumes.map((costume, index) => (
            <article key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition moomin-card">
              <figure className={`relative h-72 overflow-hidden bg-gradient-to-br ${costume.color}`}>
                <img src={costume.img} alt={costume.name} className="w-full h-full object-contain" />
                {costume.badge && (
                  <div className="absolute top-4 right-4 bg-accent text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    {costume.badge}
                  </div>
                )}
              </figure>
              <div className="p-6 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">{costume.icon} {costume.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-primary">{costume.price}<span className="text-sm font-normal text-gray-600">/vkl</span></span>
                  <a href="#yhteystiedot" className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full font-semibold transition">Varaa</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;