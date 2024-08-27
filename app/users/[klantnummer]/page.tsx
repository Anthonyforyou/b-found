import styles from './KlantPagina.module.css';
import { database } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ReactElement } from 'react';

type KlantInfo = {
  Naam: string;
  Leeftijd: string;
  Adres: string;
  Telefoonnummer_ouder: string;
  Extra_telefoonnummer: string;
  Extra_informatie: string;
};

async function fetchKlantInfo(klantnummer: string): Promise<{ klantInfo: KlantInfo | null; error?: string }> {
  let klantInfo = null;
  let error = '';

  try {
    const klantRef = doc(database, 'users', klantnummer);
    const docSnap = await getDoc(klantRef);
    
    if (docSnap.exists()) {
      klantInfo = docSnap.data() as KlantInfo;
    } else {
      error = 'Geen informatie gevonden voor dit klantnummer.';
    }
  } catch (e) {
    error = 'Er is een fout opgetreden bij het ophalen van de gegevens.';
  }

  return { klantInfo, error };
}

export default async function KlantPagina({ params }: { params: { klantnummer: string } }): Promise<ReactElement> {
  const { klantnummer } = params;
  const { klantInfo, error } = await fetchKlantInfo(klantnummer);

  if (error) {
    return <p>{error}</p>;
  }

  if (!klantInfo) {
    return <p>Geen gegevens gevonden voor klantnummer {klantnummer}.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Informatie</h1>
      <div className={styles.info-block}>
        <p>Naam: {klantInfo.Naam}</p>
      </div>
      <div className={styles.info-block}>
        <p>Leeftijd: {klantInfo.Leeftijd}</p>
      </div>
      <div className={styles.info-block}>
        <p>Telefoonnummer ouder: {klantInfo.Telefoonnummer_ouder}</p>
      </div>
      <div className={styles.info-block}>
        <p>Extra telefoonnummer: {klantInfo.Extra_telefoonnummer}</p>
      </div>
      <div className={styles.info-block}>
        <p>Extra informatie: {klantInfo.Extra_informatie}</p>
      </div>
      <button className={styles.scan-button}>Scan QR-code</button>
    </div>
  );
}
