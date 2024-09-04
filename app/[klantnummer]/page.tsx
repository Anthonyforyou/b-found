import { database } from '../../../lib/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { ReactElement } from 'react';
import styles from './KlantPagina.module.css';
import './globals.css';

type KlantInfo = {
  Naam: string;
  Leeftijd: string;
  Adres: string;
  Telefoonnummer_ouder: string;
  Extra_telefoonnummer: string;
  Extra_informatie: string;
};

type KlantPaginaProps = {
  klantnummer: string;
  shirtnummer: string;
  klantInfo: KlantInfo | null;
  error?: string;
};

async function fetchKlantInfo(klantnummer: string, shirtnummer: string): Promise<{ klantInfo: KlantInfo | null; error?: string }> {
  let klantInfo = null;
  let error = '';

  try {
    const klantRef = doc(database, klantnummer, shirtnummer); // Hier gebruiken we klantnummer als collectie en shirtnummer als document-ID
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
}

export default async function KlantPagina({ params }: { params: { klantnummer: string, shirtnummer: string } }): Promise<ReactElement> {
  const { klantnummer, shirtnummer } = params;
  const { klantInfo, error } = await fetchKlantInfo(klantnummer, shirtnummer);

  if (error) {
    return <p>{error}</p>;
  }

  if (!klantInfo) {
    return <p>Geen gegevens gevonden voor klantnummer {klantnummer} en shirtnummer {shirtnummer}.</p>;
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
