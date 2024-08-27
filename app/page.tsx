import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';

export default function KlantPagina({ params }) {
  const { klantnummer } = params;

  // Logica om klantgegevens op te halen
  const [klantInfo, setKlantInfo] = useState(null);

  useEffect(() => {
    if (klantnummer) {
      const klantRef = doc(database, 'users', klantnummer);
      getDoc(klantRef).then((snapshot) => {
        if (snapshot.exists()) {
          setKlantInfo(snapshot.data());
        } else {
          setKlantInfo({ error: 'Geen informatie gevonden voor dit klantnummer.' });
        }
      }).catch((error) => {
        console.error('Fout bij het ophalen van gegevens:', error);
        setKlantInfo({ error: 'Er is een fout opgetreden.' });
      });
    }
  }, [klantnummer]);

  if (!klantInfo) return <p>Gegevens laden...</p>;
  if (klantInfo?.error) return <p>{klantInfo.error}</p>;

  return (
    <div>
      <h1>Klantinformatie voor {klantnummer}</h1>
      <p>Naam: {klantInfo.naam}</p>
      <p>Adres: {klantInfo.adres}</p>
    </div>
  );
}
