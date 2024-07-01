import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faIndustry,
  faGlobe,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";

// Import your background image
import bgImage from "../../public/image/bg.png";

const Banner = () => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
// console.log(bgImage)
  return (
    <>
      <div className={styles.banner} style={{ backgroundImage: `${bgImage}` }}>
        <div className={styles.bannerContent2} ref={inViewRef}>
          <div className={styles.content2}>
            <h1 className={styles.heading}><u>OUR GLOBAL FOOTPRINT </u></h1>
            <p className={styles.text}>
              Over the last 20+ years, our company has successfully installed
              and commissioned over 1000+ state-of-the-art food processing and
              packaging units worldwide. With a significant presence in more
              than 28 countries across Asia, Africa, and the Americas, we have
              established ourselves as a global leader in the industry. Our
              commitment to innovation and excellence ensures that each unit
              delivers top-notch performance, meeting the diverse needs of our
              clients. By leveraging cutting-edge technology and a dedicated
              team of experts, we continue to set new benchmarks in food
              processing and packaging, driving growth and sustainability across
              the globe.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.banner2}></div>
    </>
  );
};

export default Banner;
