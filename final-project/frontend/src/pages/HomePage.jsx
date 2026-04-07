import Hero from '../components/Hero';
import About from '../components/About';
import Catalog from '../components/Catalog';
import Stats from '../components/Stats';
import CallToAction from '../components/CallToAction';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Catalog />
      <Stats />
      <CallToAction />
    </>
  );
};

export default HomePage;