import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import mission from '../../public/image/mission.png'

const Development = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        <div className={styles.flex}>
          <div className={styles.textContainer}>
            <p className={styles.heading}>Mission Objectives</p>
            <hr className={styles.hr} />
            <ul className={styles.points}>
              <li>
                <b>Innovation:</b> Continuously develop cutting-edge food
                processing and packaging machinery to meet evolving industry
                needs.
              </li>
              <li>
                <b>Quality:</b> Ensure high-quality, reliable, and efficient
                equipment to enhance the productivity and profitability of our
                clients.
              </li>
              <li>
                <b>Sustainability:</b> Embed sustainability throughout our
                operations, from design to production, aiming to minimize
                environmental impact.
              </li>
              <li>
                <b>Customer Focus:</b> Prioritize customer satisfaction through
                personalized solutions, excellent service, and ongoing support.
              </li>
              <li>
                <b>Industry Leadership:</b> Strive to be a leader in advancing
                sustainable practices within the food processing and packaging
                machinery sector.
              </li>
            </ul>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={mission}
              alt="pic"
              width={300}
              height={250}
              className={styles.categoryImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Development;
