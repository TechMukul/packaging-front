import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import Image from 'next/image';
import Link from 'next/link';

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

const sendWhatsAppMessage = (productName) => {
  const phoneNumber = "+919818293306";
  const message = encodeURIComponent(
    `Hello sir, I am interested in ${productName}. Please send me quote for the same and also share the videos.`
  );
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Open WhatsApp app on mobile
    window.open(
      `whatsapp://send?phone=${phoneNumber}&text=${message}`,
      "_blank"
    );
  } else {
    // Open WhatsApp Web on desktop/laptop
    window.open(
      `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
      "_blank"
    );
  }
};
const Feature = () => {
  const [categories, setCategories] = useState<any>([]);

  const fetchData = useCallback(async () => {
    try {
      const url = process.env.NEXT_PUBLIC_APIVAL;
      const response = await fetch(`${url}data/all-category`);
      const data = await response.json();

      const categoriesWithHttpsUrls = await Promise.all(data.slice(4, 8).map(async (category) => {
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
    <div className={styles.featuredproducts}>
      <h2 className={styles.featuredheading}>Featured Products</h2>
      <div className={styles.productcards}>
        {categories.map((category, index) => (
          <div className={styles.productcard} key={index}>
            <Link href={`/category/${category.permaLink}`} style={{ textDecoration: "none" }}>
              <Image
                src={category.photo}
                alt={category.name}
                className={styles.productimage}
                width={200}
                height={200}
              />
              <p className={styles.productdescription}>{category.name}</p>
            </Link>
            <button className={styles.button} onClick={()=>sendWhatsAppMessage(category.name)}>Request quote</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
