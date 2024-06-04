import React from "react";
import styles from "./index.module.scss"; // Import CSS file for styling
import Link from "next/link";
import Head from "next/head";

const Categories = ({ category }) => {
  return (
    <>    <Head>
    <title>Woxn Packaging</title>
    <meta name="description" content="We are machines manufacturer" />
    {/* Additional meta tags, stylesheets, etc. */}
  </Head>
      <div className={styles.categories}>
        <h2 className={styles.categoriesheading}>Categories</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "40px",
            marginTop: "0px",
            color: "white",
          }}
        >
          <hr
            className={styles.dividersmall}
            style={{
              marginTop: "14px",
              width: "5%",
              border: "none",
              borderTop: "2px solid white",
              marginRight: "5px",
            }}
          />
          Our Ranges
          <hr
            className={styles.dividersmall}
            style={{
              marginTop: "14px",
              width: "5%",
              border: "none",
              borderTop: "2px solid white",
              marginLeft: "5px",
            }}
          />
        </div>
        <div className={styles.categorycards}>
          {/* Map starting 4 category data into cards */}
          {category.slice(0, 4).map((category, index) => (
            <div key={index} className={styles.categorycard}>
              <Link href={`/category/${category.permaLink}`}>
                <img
                  src={category.photo} // Make sure to replace category.image with the actual image source
                  alt={`Category ${index + 1}`}
                  className={styles.categoryimage}
                />
                <p className={styles.categorydescription}>{category.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.centeredbutton}>
          <button
            className={styles.viewallbutton}
            //   onClick={() => console.log("View All Categories clicked")}
          >
            View All Categories
          </button>
        </div>
      </div>
    </>
  );
};

export default Categories;
