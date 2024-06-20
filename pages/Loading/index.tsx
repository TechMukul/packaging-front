import React from 'react';
import styles from './Loading.module.scss'; // Assuming you will create a CSS module for styling

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
