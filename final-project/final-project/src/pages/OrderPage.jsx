import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Zod-skeema: Määritellään säännöt, joilla lomake validoidaan
const schema = z.object({
  fullName: z.string()
    .min(2, { message: "Nimen täytyy olla vähintään 2 merkkiä pitkä." })
    .refine((value) => value.trim().split(" ").length >= 2, {
      message: "Syötä sekä etunimi että sukunimi (välilyönnillä erotettuna).",
    }),
  email: z.string().email({ message: "Syötä kelvollinen sähköpostiosoite." }),
  bookingDate: z.string().min(1, { message: "Valitse vuokrauspäivä." }),
  costume: z.string().min(1, { message: "Valitse puku." }),
});

const OrderPage = () => {
  const [serverData, setServerData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rullaa sivun ylös aina kun tämä sivu avataan
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Alustetaan React Hook Form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  // 3. Funktio, joka suoritetaan kun lomake menee läpi (validointi ok)
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerData(null);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Verkkovirhe tapahtui");

      const result = await response.json();
      setServerData(result.json); // Tallennetaan vain lomakkeen data ruudulle
      reset(); // Tyhjennetään lomake
      
    } catch (error) {
      console.error("Virhe lähetettäessä:", error);
      alert("Lomakkeen lähetys epäonnistui.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-moomin py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Otsikko */}
        <div className="text-center mb-12 fade-in-up">
          <div className="text-5xl mb-4">🎭</div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
            Tilaa Muumipuku
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Täytä alle tietosi, niin varaamme puvun sinulle haluamallesi päivälle!
          </p>
        </div>

        {/* Lomakekortti */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 fade-in-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Etu- ja sukunimi */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Etu- ja sukunimi</label>
              <input 
                type="text" 
                placeholder="Matti Meikäläinen"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/50 focus:border-primary'}`}
                {...register('fullName')} 
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Sähköposti */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sähköpostiosoite</label>
              <input 
                type="email" 
                placeholder="matti@esimerkki.fi"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/50 focus:border-primary'}`}
                {...register('email')} 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Päivämäärä */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Vuokrauspäivä</label>
              <input 
                type="date" 
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${errors.bookingDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/50 focus:border-primary'}`}
                {...register('bookingDate')} 
              />
              {errors.bookingDate && <p className="text-red-500 text-sm mt-1">{errors.bookingDate.message}</p>}
            </div>

            {/* Puvun valinta (Select) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Valitse puku</label>
              <select 
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition bg-white ${errors.costume ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/50 focus:border-primary'}`}
                {...register('costume')}
              >
                <option value="">-- Valitse listasta --</option>
                <option value="Muumipeikko">💙 Muumipeikko</option>
                <option value="Muumimamma">💕 Muumimamma</option>
                <option value="Muumipappa">🎩 Muumipappa</option>
                <option value="Nipsu">🔴 Nipsu</option>
                <option value="Nuuskamuikkunen">🌲 Nuuskamuikkunen</option>
                <option value="Niiskuneiti">👸 Niiskuneiti</option>
              </select>
              {errors.costume && <p className="text-red-500 text-sm mt-1">{errors.costume.message}</p>}
            </div>

            {/* Lähetyspainike */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-lg font-bold text-gray-900 transition transform ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-orange-400 hover:scale-105 shadow-lg'}`}
            >
              {isSubmitting ? 'Lähetetään...' : 'Vahvista Tilaus 🎉'}
            </button>
          </form>

          {/* Onnistumisviesti ja JSON-data */}
          {serverData && (
            <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6 fade-in-up">
              <h3 className="text-green-800 text-xl font-bold mb-2 flex items-center">
                <i className="fa-solid fa-circle-check mr-2"></i> 
                Tilaus lähetetty onnistuneesti!
              </h3>
              <p className="text-green-700 mb-4 text-sm">
                Palvelin (httpbin) palautti seuraavat tallennetut tiedot:
              </p>
              <pre className="bg-white p-4 rounded border border-green-100 text-sm text-gray-800 overflow-x-auto shadow-inner">
                {JSON.stringify(serverData, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default OrderPage;