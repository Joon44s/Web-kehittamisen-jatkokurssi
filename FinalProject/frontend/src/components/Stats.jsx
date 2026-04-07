const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <h2 className="text-3xl font-bold mb-4 sr-only">Tietoa Meistä</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">1500+</div>
            <div className="text-lg opacity-90">Tyytyväistä asiakasta</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">25+</div>
            <div className="text-lg opacity-90">Erilaista pukua</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">5+</div>
            <div className="text-lg opacity-90">Vuotta toiminnassa</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">5/5</div>
            <div className="text-lg opacity-90">Asiakastyytyväisyys</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;