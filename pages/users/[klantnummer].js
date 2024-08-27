import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../lib/firebase';

const KlantPagina = () => {
  const router = useRouter();
  const { klantnummer } = router.query;
  const [klantInfo, setKlantInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (klantnummer) {
      const klantRef = ref(database, 'Users/' + klantnummer);
      get(klantRef).then((snapshot) => {
        if (snapshot.exists()) {
          setKlantInfo(snapshot.val());
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
    </div>
  );
};

export default KlantPagina;