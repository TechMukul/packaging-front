import React, { useEffect, useState, useCallback } from "react";
import styles from "./index.module.scss";
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

const Categories = React.memo(() => {
  const [categories, setCategories] = useState<any>([]);

  const fetchData = useCallback(async () => {
    try {
      const url = process.env.NEXT_PUBLIC_APIVAL;
      const response = await fetch(`${url}data/all-category`);
      const data = await response.json();

      // Convert gs URLs to HTTPS URLs for the first 4 images
      const categoriesWithHttpsUrls = await Promise.all(data.slice(0, 4).map(async (category) => {
        const httpsUrl = await getDownloadURL(ref(storage, category.photo));
        return { ...category, photo: httpsUrl };
      }));
      setCategories(categoriesWithHttpsUrls);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Head>
        <title>Woxn Packaging</title>
        <meta name="description" content="We are machines manufacturer" />
      </Head>
      <div className={styles.categories}>
        <h2 className={styles.categoriesheading}>Categories</h2>
        <div className={styles.ranges}>
          <hr className={styles.dividersmall} />
          Our Ranges
          <hr className={styles.dividersmall} />
        </div>
        <div className={styles.categorycards}>
          {categories.slice(0, 4).map((category, index) => (
            <div key={index} className={styles.categorycard}>
              <Link href={`/category/${category.permaLink}`}>
                <img
                  src={category.photo}
                  alt={`Category ${index + 1}`}
                  className={styles.categoryimage}
                />
                <p className={styles.categorydescription}>{category.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.centeredbutton}>
          <Link href="/allCategories">
            <button className={styles.viewallbutton}>
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </>
  );
});

export default Categories;
