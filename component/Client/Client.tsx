import React from 'react';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faIndustry, faGlobe, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import styles from './index.module.scss';

const Client = () => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.clientContainer} ref={inViewRef}>
      <div className={styles.stat}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faGavel} width={100} height={100} className={styles.icon} />
        </div>
        <div className={styles.countContainer}>
          {inView ? <CountUp end={900} duration={2.5} /> : 0}+
        </div>
        <p className={styles.label}>Government Project</p>
      </div>
      <div className={styles.stat}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faIndustry} width={100} height={100} className={styles.icon} />
        </div>
        <div className={styles.countContainer}>
          {inView ? <CountUp end={1800} duration={2.5} /> : 0}+
        </div>
        <p className={styles.label}>Plant Setup</p>
      </div>
      <div className={styles.stat}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faGlobe} width={100} height={100} className={styles.icon} />
        </div>
        <div className={styles.countContainer}>
          {inView ? <CountUp end={1200} duration={2.5} /> : 0}+
        </div>
        <p className={styles.label}>Export Project</p>
      </div>
      <div className={styles.stat}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faChartLine} width={100} height={100} className={styles.icon} />
        </div>
        <div className={styles.countContainer}>
          {inView ? <CountUp end={5} duration={2.5} /> : 0}Cr.+
        </div>
        <p className={styles.label}>Company Turnover</p>
      </div>
    </div>
  );
};

export default Client;
