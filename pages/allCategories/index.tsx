import React, { useEffect, useState } from "react";
import styles from "./index.module.scss"; // Import your SCSS module for styling
import Navbar from "../../component/Navbar/Navbar";
import Link from "next/link";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import Image from "next/image";
import Loading from "../Loading";

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

const LoadingComponent: React.FC = () => (
  <div className={styles.loading}><Loading /></div>
);

const Index: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const response = await fetch(`${url}data/all-category`);
        const data = await response.json();

        // Convert gs URLs to HTTPS URLs for the first 4 images
        const categoriesWithHttpsUrls = await Promise.all(
          data.map(async (category) => {
            const httpsUrl = await getDownloadURL(ref(storage, category.photo));
            return { ...category, photo: httpsUrl };
          })
        );

        setCategories(categoriesWithHttpsUrls);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingComponent />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={styles.container}>
        <Navbar />
        <h2 className={styles.heading}>All Categories</h2>
        <div className={styles.noData}>No categories available.</div>
      </div>
    );
  }

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
                  <Link href={`/category/${category.permaLink}`}>
                    <Image
                      src={category.photo}
                      alt={`${category.name} photo`}
                      className={styles.categoryImage}
                      layout="fill"
                    />
                  </Link>
                </div>
                <div className={styles.buttonContainer}>
                  <Link href={`/request-quote/${category._id}`}>
                    <button className={styles.requestButton}>Request Quote</button>
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
