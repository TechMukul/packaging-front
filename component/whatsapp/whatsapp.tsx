import React from 'react';
// import './whatsapp.scss'; // Style file for WhatsApp logo
import styles from './index.module.scss'
const WhatsApp = () => {
  return (
    <div className={styles.whatsappcontainer}>
      <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="WhatsApp Logo" className={styles.whatsapplogo} />
      </a>
      
    </div>
  );
}

export default WhatsApp;
