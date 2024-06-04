import React from 'react';
import styles from './index.module.scss'; // Import your CSS file for styling

const Enquire = () => {
  return (
    <div className={styles.enquireContainer}>
      <h1 className={styles.heading}>Have Any Query?</h1>
      <form className={styles.enquireForm}>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Name" className={styles.inputField} />
          <input type="text" placeholder="Email" className={styles.inputField} />
        </div>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Phone" className={styles.inputField} />
          <input type="text" placeholder="Subject" className={styles.inputField} />
        </div>
        <div className={styles.formGroup}>
          <textarea placeholder="Message" className={styles.textArea}></textarea>
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default Enquire;
