import React from 'react';
import styles from './KlantPagina.module.css'; // hergebruiken van dezelfde stijlen

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Informatie</h1>
      <div className={styles.infoBlock}>
        <p>Voordat er informatie wordt getoond, moet je een QR-code scannen van D-brand.</p>
      </div>
    </div>
  );
}

