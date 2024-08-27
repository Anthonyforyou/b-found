// pages/users/[klantnummer].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../lib/firebase';

const KlantPagina = () => {
  const router = useRouter();
  const { klantnummer } = router.query; // Haal het klantnummer uit de router query
  const [klantInfo, setKlantInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (klantnummer) {
      // Referentie naar het document in de collectie 'users' met het klantnummer als documentnaam
      const klantRef = doc(database, 'users', klantnummer);
      getDoc(klantRef).then((snapshot) => {
        if (snapshot.exists()) {
          setKlantInfo(snapshot.data()); // Haal de data uit het document
        } else {
          setKlantInfo({ error: 'Geen informatie gevonden voor dit klantnummer.' });
        }
        setLoading(false);
      }).catch((error) => {
        console.error('Fout bij het ophalen van gegevens:', error);
        setKlantInfo({ error: 'Er is een fout opgetreden.' });
        setLoading(false);
      });
    }
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
      {/* Voeg andere klantinformatie toe die je hebt */}
    </div>
  );
};

export default KlantPagina;
