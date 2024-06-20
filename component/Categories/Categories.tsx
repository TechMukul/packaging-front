import React, { useState, useEffect, useCallback } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(-1); // Track clicked index

  const fetchData = useCallback(async () => {
    try {
      const url = process.env.NEXT_PUBLIC_APIVAL;
      const response = await fetch(`${url}data/all-category`);
      const data = await response.json();

      const categoriesWithHttpsUrls = await Promise.all(data.map(async (category) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Interval set to 2 seconds for demo purposes

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= categories.length - 5 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? categories.length - 5 : prevIndex - 1));
  };

  const handleCardClick = (index) => {
    setClickedIndex(index === clickedIndex ? -1 : index); // Toggle clicked index
  };

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
          <p style={{color:"white"}}>Our Ranges</p>
          <hr className={styles.dividersmall} />
        </div>
        <div className={styles.categorycards}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${styles.categorycard} ${clickedIndex === index ? styles.clickedCard : ''}`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <Link href={`/category/${category.permaLink}`} className={styles.link}>
                <div className={styles.cardContent}>
                  <Image
                    src={category.photo}
                    alt={`Category ${index + currentIndex + 1}`}
                    className={styles.categoryimage}
                    width={500}
                    height={300}
                  />
                  <p className={styles.categorydescription}>{category.name}</p>
                  <button className={styles.requestQuoteButton} onClick={() => handleCardClick(index)}>
                    Request Quote
                    <span className={styles.buttonHoverEffect}></span>
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button className={`${styles.arrowButton} ${styles.prev}`} onClick={prevSlide}>
          &#10094;
        </button>
        <button className={`${styles.arrowButton} ${styles.next}`} onClick={nextSlide}>
          &#10095;
        </button>
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
