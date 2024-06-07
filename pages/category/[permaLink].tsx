import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./PermaLink.module.scss";
import Link from "next/link";
import Navbar from "../../component/Navbar/Navbar";
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

const storage = getStorage(initializeApp(firebaseConfig));

const PermaLink = ({ Categories }) => {
  const router = useRouter();
  const { permaLink } = router.query;

  const [upperData, setUpperData] = useState<any>(null);
  const [lowerData, setLowerData] = useState<any>([]);
  const [loadingRelated, setLoadingRelated] = useState<any>(true);
  const [mainImageIndex, setMainImageIndex] = useState<any>(0);

  useEffect(() => {
    const fetchPermaLinkData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const responseUpper = await fetch(`${url}data/head/permalink/${permaLink}`);
        const upperData = await responseUpper.json();

        const responseLower = await fetch(`${url}data/category/${permaLink}`);
        const lowerData = await responseLower.json();

        const upperImageUrls = await fetchImageUrls(upperData.photo);
        const lowerImageUrls = await fetchImageUrls(lowerData.map(item => item.photo[0]));

        setUpperData({
          ...upperData,
          photo: upperImageUrls
        });
        setLowerData(
          lowerData.map((item, index) => ({
            ...item,
            photo: [lowerImageUrls[index]]
          }))
        );
        setLoadingRelated(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (permaLink) {
      fetchPermaLinkData();
    }
  }, [permaLink]);
 
  const fetchImageUrls = async (photoUrls) => {
    try {
      const imageUrls = await Promise.all(
        photoUrls.map(async (photoUrl) => {
          const imageRef = ref(storage, photoUrl);
          return getDownloadURL(imageRef);
        })
      );
      return imageUrls;
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      return [];
    }
  };
  const formatTitle = (link) => {
    return link.replace(/-/g, " ").toUpperCase();
  };
  
  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const formatContent = (content) => {
    const sections = content.split("\n\n").map((section, index) => {
      const [title, ...paragraphs] = section.split("\n");
      return (
        <div key={index} className={styles.section}>
          <p className={styles.paragraph}>{title}</p>
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    });
    return sections;
  };

  return (
    <>
      <Navbar />
      {upperData && (
        <>
          <h1 className={styles.title} style={{ textAlign: "center", fontWeight: "bold", fontFamily: "" }}>
            {upperData && formatTitle(upperData.title)}
          </h1>
          <div className={styles.container}>
            <div className={styles.upperSection}>
              <div className={styles.thumbnailContainer}>
                {upperData.photo.map((image, index) => (
                  <img
                    key={index}
                    className={`${styles.thumbnail} ${index === mainImageIndex ? styles.activeThumbnail : ''}`}
                    src={image}
                    alt={`${upperData.title} ${index + 1}`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
              <div className={styles.leftSection}>
                <img
                  className={styles.mainImage}
                  src={upperData.photo[mainImageIndex]}
                  alt={upperData.title}
                />
              </div>
              <div className={styles.content} style={{ textAlign: "justify", fontWeight: "1400" }}>
                {formatContent(upperData.content)}
              </div>
            </div>
          </div>
        </>
      )}
      <>
        <h1 style={{ textAlign: "center" }}>Related Products</h1>
        <div className={styles.cardcontainer}>
          {loadingRelated ? (
            <p>Loading...</p>
          ) : (
            lowerData.map((item) => (
              <Link href={`/singlepage/${item.permaLink}`} key={item._id}>
                <div className={styles.card}>
                  <img
                    className={styles.image}
                    src={item.photo[0]}
                    alt={item.title}
                  />
                  <div className={styles.cardContent}>
                    <h1 className={styles.cardTitle}>{item.title}</h1>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div> 
      </>
    </>
  );
};

export default PermaLink;
