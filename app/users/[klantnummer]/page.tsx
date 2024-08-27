// app/users/[klantnummer]/page.tsx
import { GetServerSideProps } from 'next';
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

export default function KlantPagina({ klantnummer, klantInfo, error }: KlantPaginaProps): ReactElement {
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

// Dit is een voorbeeld van een server-side functie
export const getServerSideProps: GetServerSideProps = async (context) => {
  const klantnummer = context.params?.klantnummer as string;
  let klantInfo = null;
  let error = '';

  if (klantnummer) {
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
  }

  return {
    props: {
      klantnummer,
      klantInfo,
      error,
    },
  };
};
