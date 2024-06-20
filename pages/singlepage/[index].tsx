import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import Head from "next/head";
import axios from "axios"; // Import axios for data fetching
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyD3NQqtRWs1weSryxTCjpoGgLn-l5KdjQM",
  authDomain: "woxnpackaging.firebaseapp.com",
  projectId: "woxnpackaging",
  storageBucket: "woxnpackaging.appspot.com",
  messagingSenderId: "727828228447",
  appId: "1:727828228447:web:554b313dcd3df6c67a6eea",
  measurementId: "G-8HF5CJ9Y3Q",
};

const PermaLink = () => {
  const [mainImage, setMainImage] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { index } = router.query;

  useEffect(() => {
    const fetchPermalinkData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const response = await axios.get(`${url}data/permalink/${index}`);
        const result = response.data;

        const storage = getStorage(initializeApp(firebaseConfig));
        const photoUrls = await Promise.all(
          result.photo.map(async (photoPath) => {
            const imageRef = ref(storage, photoPath);
            return await getDownloadURL(imageRef);
          })
        );

        result.photo = photoUrls;
        setMainImage(result);
      } catch (error) {
        console.error("Error fetching permalink data:", error);
      }
    };

    if (index) {
      fetchPermalinkData();
    }
  }, [index]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Head>
        <title>{mainImage?.title}</title>
        <meta name="description" content="We are machines manufacturer" />
      </Head>
      <Navbar />
      <h1 className={styles.title}>{mainImage?.title}</h1>
      <div className={styles["card-container"]}>
        {mainImage ? (
          <>
            <div className={styles["thumbnail-container"]}>
              {mainImage.photo.map((item: string, index: number) => (
                <img
                  key={index}
                  src={item}
                  alt={`Thumbnail ${index}`}
                  className={`${styles.thumbnail} ${index === selectedIndex ? styles.selected : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
            <div className={styles.cont}>
              <img
                src={mainImage.photo[selectedIndex]}
                alt="Main"
                className={styles["main-image"]}
              />
            </div>
            <div className={styles.content}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: mainImage.content
                    ?.replace(/<head[^>]*>[\s\S]*?<\/head>/g, "")
                    .replace(/<h1[^>]*>.*?<\/h1>/g, "")
                    .replace(/\\n|\\/g, ""),
                }}
              />
              {mainImage.additionalInfo && (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(mainImage.additionalInfo).map(
                      ([key, value], index) => (
                        <tr key={index}>
                          <td>{key}</td>
                          <td>{value as string}</td>
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
