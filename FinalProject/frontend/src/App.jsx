import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import BookingsList from './pages/BookingsList'; // UUSI

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/bookings" element={<BookingsList />} /> {/* UUSI REITTI */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;