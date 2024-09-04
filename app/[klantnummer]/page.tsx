import { GetServerSideProps } from 'next';
import { database } from '../../lib/firebase'; // Zorg ervoor dat het pad naar firebase.js correct is
import { doc, getDoc } from 'firebase/firestore';
import styles from './KlantPagina.module.css'; // Zorg ervoor dat het pad naar je CSS-bestand correct is
import './globals.css'; // Zorg ervoor dat het pad naar je globale CSS-bestand correct is


type KlantInfo = {
  Naam: string;
  Leeftijd: string;
  Adres: string;
  Telefoonnummer_ouder: string;
  Extra_telefoonnummer: string;
  Extra_informatie: string;
};

type KlantPaginaProps = {
  klantInfo: KlantInfo | null;
  error?: string;
};

const fetchKlantInfo = async (klantnummer: string, shirtnummer: string): Promise<{ klantInfo: KlantInfo | null; error?: string }> => {
  let klantInfo = null;
  let error = '';

  try {
    // Zorg ervoor dat de referentie naar Firestore correct is
    const klantRef = doc(database, 'users', klantnummer, 'shirts', shirtnummer); 
    const docSnap = await getDoc(klantRef);
    
    if (docSnap.exists()) {
      klantInfo = docSnap.data() as KlantInfo;
    } else {
      error = 'Geen informatie gevonden voor dit shirtnummer.';
    }
  } catch (e) {
    error = 'Er is een fout opgetreden bij het ophalen van de gegevens.';
  }

  return { klantInfo, error };
};

export async function generateMetadata({ params }: { params: { klantnummer: string, shirtnummer: string } }) {
  const { klantnummer, shirtnummer } = params;
  const { klantInfo } = await fetchKlantInfo(klantnummer, shirtnummer);
  return {
    title: klantInfo ? `Informatie voor ${klantnummer}/${shirtnummer}` : 'Geen gegevens',
  };
}

export default async function KlantPagina({ params }: { params: { klantnummer: string, shirtnummer: string } }) {
  const { klantnummer, shirtnummer } = params;
  const { klantInfo, error } = await fetchKlantInfo(klantnummer, shirtnummer);

  if (error) {
    return <p>{error}</p>;
  }

  if (!klantInfo) {
    return <p>Geen gegevens gevonden.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Informatie</h1>
      <div className={styles.infoBlock}>
        <p>Naam: {klantInfo.Naam}</p>
      </div>
      <div className={styles.infoBlock}>
        <p>Leeftijd: {klantInfo.Leeftijd}</p>
      </div>
      <div className={styles.infoBlock}>
        <p>Adres: {klantInfo.Adres}</p>
      </div>
      <div className={styles.infoBlock}>
        <p>Telefoonnummer ouder: {klantInfo.Telefoonnummer_ouder}</p>
      </div>
      <div className={styles.infoBlock}>
        <p>Extra telefoonnummer: {klantInfo.Extra_telefoonnummer}</p>
      </div>
      <div className={styles.infoBlock}>
        <p>Extra informatie: {klantInfo.Extra_informatie}</p>
      </div>
    </div>
  );
}
