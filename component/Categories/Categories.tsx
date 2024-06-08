import React, { useEffect, useState } from "react";
import styles from "./index.module.scss"; // Import CSS file for styling
import Link from "next/link";
import Head from "next/head";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3NQqtRWs1weSryxTCjpoGgLn-l5KdjQM",
  authDomain: "woxnpackaging.firebaseapp.com",
  projectId: "woxnpackaging",
  storageBucket: "woxnpackaging.appspot.com",
  messagingSenderId: "727828228447",
  appId: "1:727828228447:web:554b313dcd3df6c67a6eea",
  measurementId: "G-8HF5CJ9Y3Q"
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const Categories = ( ) => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const response = await fetch(`${url}data/all-category`);
        const data = await response.json();
        // console.log("data", data);

        // Convert gs URLs to HTTPS URLs for the first 4 images
        const categoriesWithHttpsUrls = await Promise.all(data.slice(0, 4).map(async (category) => {
          const httpsUrl = await getDownloadURL(ref(storage, category.photo));
          return { ...category, photo: httpsUrl };
        }));
        // console.log(categoriesWithHttpsUrls)
        setCategories(categoriesWithHttpsUrls);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
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
            height: "20px",
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
          {categories.slice(0, 4).map((category, index) => (
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
            
              // onClick={() => console.log("View All Categories clicked")}
          >
           <Link href={"/allCategories"} className={styles.viewallbutton} color="white"> View All Categories </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Categories;
