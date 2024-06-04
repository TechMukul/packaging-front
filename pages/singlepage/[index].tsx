import React, { useState } from "react";
import styles from "./index.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import Head from "next/head";

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

const PermaLink = ({ data, Categories }) => {
  const [mainImage, setMainImage] = useState(data.photo[0]);

  const handleThumbnailClick = (photo) => {
    setMainImage(photo);
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="We are machines manufacturer" />
        {/* Additional meta tags, stylesheets, etc. */}
      </Head>
      {/* <Navbar Categories={Categories} /> */}
      <h1 className={styles.title}>{data.title}</h1>
      <div className={styles["card-container"]}>
        {data ? (
          <>
            <div className={styles["thumbnail-container"]}>
              {data.photo.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`Thumbnail ${index}`}
                  className={styles.thumbnail}
                  onClick={() => handleThumbnailClick(item)}
                />
              ))}
            </div>
            <div className={styles.cont}>
              <img src={mainImage} alt="Main" className={styles["main-image"]} />
            </div>
            <div className={styles.content}>
            <div
  className={styles.description}
  dangerouslySetInnerHTML={{
    __html: data.content
      .replace(/<head[^>]*>[\s\S]*?<\/head>/g, '') // Remove head tag and its content
      .replace(/<h1[^>]*>.*?<\/h1>/g, '') // Remove h1 tag and its content
      .replace(/\\n|\\/g, '') // Remove newline characters and backslashes
  }}
/>



              {data.additionalInfo && (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.additionalInfo).map(
                      ([key, value], index) => (
                        <tr key={index}>
                          <td>{key}</td>
                          {/* <td>{value}</td> */}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </>
  );
};

export default PermaLink;

export async function getServerSideProps(context) {
  const { params } = context;
  const { index } = params;

  try {
    const response = await fetch(`http://localhost:3000/data/permalink/${index}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    const categoriesResponse = await fetch("http://localhost:3000/data/all-category");

    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories data. Status: ${categoriesResponse.status}`);
    }

    const Categories = await categoriesResponse.json();

    const storage = getStorage(initializeApp(firebaseConfig));

    // Fetch image URLs from Firebase Storage
    const photoUrls = await Promise.all(data.photo.map(async (photoPath) => {
      const imageRef = ref(storage, photoPath);
      return await getDownloadURL(imageRef);
    }));

    data.photo = photoUrls;

    return {
      props: {
        data,
        Categories
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
      },
    };
  }
}
