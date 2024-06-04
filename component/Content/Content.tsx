import React from "react";
import styles from "./index.module.scss"; // Import CSS file for styling

import Image from "next/image";
import divider from '../../public/image/divider.png'
import dividertom from '../../public/image/dividertom.webp'

const Content = () => {
  return (
    <div style={{ padding: "1%" }}>
      <h1 className={styles["main-heading"]}>
      Manufacturer, Supplier & Exporter of Food Processing & Packaging Machines - Woxn Packaging Solution (P). LTD.
      </h1>
      {/* <hr className="divider" /> */}
      <div style={{ display: "flex", height: "40px", marginBottom: "10px" }}>
        <hr className={styles.divider} style={{ marginTop: "24px" }} />
        <Image
          style={{ height: "100%", width: "10%" }}
          src={divider}
          alt="Decorative Image"
          className={styles["centered-image"]}
        />
        <hr className={styles.divider} style={{ marginTop: "24px" }} />
      </div>
      <p
        className={styles.para}
        style={{
          fontSize: "1.1rem",
          lineHeight: "1.6",
          color: "#333",
          textAlign: "center",
          fontFamily: "Verdana, sans-serif", // Added font-family property
        }}
      >
        When it comes to commercial kitchen equipment, we at{" "}
        <b style={{ color: "#2196f3" }}>Woxn Packaging Equipments</b> know what
        it takes to get the job done. We’ve been manufacturing top-quality
        equipment for several years, and in that time, we’ve built up a
        reputation for excellence.
        <br />
        <br />
        <span style={{ color: "#2196f3" }}>Woxn Packaging</span> is now known as
        a brand that stands for quality in the hospitality industry, thanks to
        its constant research and development and high standards. We offer a
        wide range of commercial kitchen equipment for places like hotels,
        restaurants, hospitals, schools, food courts, corporate kitchens,
        industrial canteens, and more.
      </p>
      <div style={{ marginTop: "10px" }}>
        <h1 className={styles["main-heading"]}>Our product range includes:</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "40px",
            marginTop: "0px",
          }}
        >
          <hr
            className={styles.dividersmall}
            style={{
              marginTop: "14px",
              width: "5%",
              border: "none",
              borderTop: "2px solid #333",
              marginRight: "5px",
            }}
          />
          <Image
            style={{ height: "80%", width: "4%", margin: "0" }}
            src={dividertom}
            alt="Decorative Image"
            className={styles["centered-image"]}
          />
          <hr
            className={styles.dividersmall}
            style={{
              marginTop: "14px",
              width: "5%",
              border: "none",
              borderTop: "2px solid #333",
              marginLeft: "5px",
            }}
          />
        </div>
        <div className={styles["columns-container"]}>
          <div className={styles.column}>
            {/* <h2>Column 1</h2> */}
            <ul>
              <li>Vegetable Cutting Machines</li>
              <li>Vegetable Washing Machines</li>
              <li>Commercial Food Steamer</li>
            </ul>
          </div>
          <div className={styles.column}>
            {/* <h2>Column 2</h2> */}
            <ul>
              <li>Energy Saving Cooking Kettle</li>
              <li>Cooking Equipments</li>
              <li>Mixer And Grinder</li>
            </ul>
          </div>
          <div className={styles.column}>
            {/* <h2>Column 3</h2> */}
            <ul>
              <li>High-Pressure Washer</li>
              <li>Bain-Marie</li>
              <li>Tables, Sinks, Racks, Trolleys, And Much More</li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <p className={styles.para} style={{ padding: "1%", color:"black" }}>
        Being one of the{" "}
        <b> Top-Notch Commercial Kitchen Equipment Manufacturers,</b> We know
        that the kitchen is the heart of any food business, and we take pride in
        outfitting our customers with the best possible tools to help them
        succeed.
      </p>
    </div>
  );
};

export default Content;
