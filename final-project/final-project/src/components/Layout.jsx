import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <a href="#top" className="fixed bottom-8 right-8 bg-primary hover:bg-secondary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110 z-40" aria-label="Takaisin ylös">
        <i className="fa-solid fa-arrow-up text-xl"></i>
      </a>
    </div>
  );
};

export default Layout;