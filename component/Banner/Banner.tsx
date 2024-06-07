import React from "react";
 // Import CSS file for styling
import man from "../../public/image/man.svg";
import earth from "../../public/image/earth.svg";
import medal from "../../public/image/medal.svg";
import building from "../../public/image/building.svg";
import world from "../../public/image/world.svg";
import Image from "next/image";
import styles from "./index.module.scss";
const Banner = () => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannercontent}>
          <div className={styles.content}>
            <Image src={man} alt="" className={styles.img} style={{}}></Image>
            <p className={styles.para} style={{}}>1500 + Happy Customer Worldwide</p>
          </div>
          <div className={styles.content}>
            <Image src={earth} alt="" className={styles.img}  style={{}}></Image>
            <p className={styles.para}>
              25+ Countries Worldwide
            </p>
          </div>
          <div className={styles.content}>
            <Image src={medal} alt="" className={styles.img}  style={{}}></Image>
            <p className={styles.para}>
              20 + Years of Excellence
            </p>
          </div>
          <div className={styles.content} style={{ height: "40px", width: "100%" }}>
            <Image src={building} alt="" className={styles.img}  style={{}}></Image>
            <p className={styles.para}>
              10 + Sales and Service Centres Worldclass
            </p>
          </div>
          <div className={styles.imagecontainer}>
            {/* <img src="banner-image.jpg" alt="Banner" />    */}
          </div>
        </div>
      </div>
      <div className={styles.banner2}>
        <div className={styles.bannercontent2}>
          <div className={styles.content2}>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                color: "rgb(37, 150, 190) ",
                margin: "auto",
                marginTop: "50px",
                marginLeft: "30px",
              }}
            >
              OUR GLOBAL FOOTPRINT
            </h1>
            <p style={{ textAlign: "justify", padding: "5%" }}>
              Over the last 36+ years, the company has successfully installed
              and commissioned over 1500+ food processing and packaging units
              worldwide in over 30+ countries across Asia, Africa, and Americas.
              {/* <Image src={world} alt="world"></Image> */}
            </p>
          </div>{" "}
          <div className={styles.content2}>
            <Image
              src={world}
              alt="world"
              style={{ marginTop: "60px",width:"90%",height:"auto" }}
            ></Image>
          </div>
          <div className="image-container">
            {/* <img src="banner-image.jpg" alt="Banner" />    */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
