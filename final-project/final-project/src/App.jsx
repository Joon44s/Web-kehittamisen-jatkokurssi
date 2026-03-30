import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Catalog from './components/Catalog';
import Stats from './components/Stats';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog />
        <Stats />
        <CallToAction />
      </main>
      <Footer />
      
      <a href="#home" className="fixed bottom-8 right-8 bg-primary hover:bg-secondary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110 z-40" aria-label="Takaisin ylös">
        <i className="fa-solid fa-arrow-up text-xl"></i>
      </a>
    </>
  );
}

export default App;