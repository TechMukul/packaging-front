import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'; // Import your SCSS module for styling
import Navbar from '../../component/Navbar/Navbar';
import Link from 'next/link';
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

interface Category {
  _id: string;
  name: string;
  photo: string;
  permaLink: string;
  createdAt: string;
  updatedAt: string;
}

const Index: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const response = await fetch(`${url}data/all-category`);
        const data = await response.json();
        console.log("data", data);

        // Convert gs URLs to HTTPS URLs for the first 4 images
        const categoriesWithHttpsUrls = await Promise.all(data.map(async (category) => {
          const httpsUrl = await getDownloadURL(ref(storage, category.photo));
          return { ...category, photo: httpsUrl };
        }));
        console.log(categoriesWithHttpsUrls)
        setCategories(categoriesWithHttpsUrls);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
console.log(categories)
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.heading}>All Categories</h2>
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <div className={styles.categoryCard} key={category._id}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{category.name}</h3>
                <div className={styles.imageContainer}>
                  <Link href={`/category/${category.permaLink}`} >
                    <img
                      src={category.photo}
                      alt={`${category.name} photo`}
                      width={200} // Set a fixed width for uniform image sizes
                      height={200} // Set a fixed height for uniform image sizes
                      className={styles.categoryImage}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
