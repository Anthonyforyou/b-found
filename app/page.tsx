import React from 'react';
import styles from './KlantPagina.module.css'; // hergebruiken van dezelfde stijlen
import './globals.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Informatie</h1>
      <div className={styles.infoBlock}>
        <p>Je moet eerst een QR-code scannen van B-found voordat je hier informatie kan zien.</p>
      </div>
    </div>
  );
}

