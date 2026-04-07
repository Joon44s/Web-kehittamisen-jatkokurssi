import { useState, useEffect } from 'react';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rullaa ylös
    window.scrollTo(0, 0);
    
    // Hae data backendistä
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Virhe haettaessa varauksia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-moomin py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in-up">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
            Tallennetut Varaukset
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Tässä näet kaikki tietokantaan tallennetut muumipukuvaraukset (Read-operaatio).
          </p>
        </div>

        {loading ? (
          <p className="text-center text-xl">Ladataan varauksia tietokannasta...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <p className="text-gray-500 text-lg">Yhtään varausta ei ole vielä tehty.</p>
          </div>
        ) : (
          <div className="grid gap-6 fade-in-up">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-primary flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{booking.full_name}</h3>
                  <p className="text-gray-500"><i className="fa-regular fa-envelope mr-2"></i>{booking.email}</p>
                  <p className="text-gray-500"><i className="fa-regular fa-calendar mr-2"></i>{new Date(booking.booking_date).toLocaleDateString('fi-FI')}</p>
                </div>
                <div className="mt-4 md:mt-0 bg-blue-50 px-4 py-2 rounded-full text-blue-800 font-bold">
                  🎭 {booking.costume}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;