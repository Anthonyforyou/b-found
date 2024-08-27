// app/users/[klantnummer]/page.tsx
import { database } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ReactElement } from 'react';

type KlantInfo = {
  naam: string;
  adres: string;
};

type KlantPaginaProps = {
  klantnummer: string;
  klantInfo: KlantInfo | null;
  error?: string;
};

// Server component die asynchroon data ophaalt
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
    <div>
      <h1>Klantinformatie voor {klantnummer}</h1>
      <p>Naam: {klantInfo.naam}</p>
      <p>Adres: {klantInfo.adres}</p>
    </div>
  );
}
