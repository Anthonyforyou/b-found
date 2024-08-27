import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../lib/firebase';

const KlantPagina = () => {
  const router = useRouter();
  const { klantnummer } = router.query;
  const [klantInfo, setKlantInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (klantnummer) {
        try {
          const klantRef = doc(database, 'Users', klantnummer); // Firestore doc
          const snapshot = await getDoc(klantRef);
          if (snapshot.exists()) {
            setKlantInfo(snapshot.data());
          } else {
            setKlantInfo({ error: 'Geen informatie gevonden voor dit klantnummer.' });
          }
        } catch (error) {
          console.error('Fout bij het ophalen van gegevens:', error);
          setKlantInfo({ error: 'Er is een fout opgetreden.' });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [klantnummer]);

  if (loading) {
    return <p>Gegevens laden...</p>;
  }

  if (klantInfo?.error) {
    return <p>{klantInfo.error}</p>;
  }

  return (
    <div>
      <h1>Klantinformatie voor {klantnummer}</h1>
      <p>Naam: {klantInfo.naam}</p>
      <p>Adres: {klantInfo.adres}</p>
    </div>
  );
};

export default KlantPagina;

  );
};

export default KlantPagina;
