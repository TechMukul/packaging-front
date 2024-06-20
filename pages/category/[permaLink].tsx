import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./PermaLink.module.scss";
import Link from "next/link";
import Navbar from "../../component/Navbar/Navbar";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import Loading from "../Loading";
import Image from "next/image";

const firebaseConfig = {
  apiKey: "AIzaSyD3NQqtRWs1weSryxTCjpoGgLn-l5KdjQM",
  authDomain: "woxnpackaging.firebaseapp.com",
  projectId: "woxnpackaging",
  storageBucket: "woxnpackaging.appspot.com",
  messagingSenderId: "727828228447",
  appId: "1:727828228447:web:554b313dcd3df6c67a6eea",
  measurementId: "G-8HF5CJ9Y3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const PermaLink = ({ Categories }) => {
  const router = useRouter();
  const { permaLink } = router.query;

  const [upperData, setUpperData] = useState<any>(null);
  const [lowerData, setLowerData] = useState<any>([]);
  const [loadingRelated, setLoadingRelated] = useState<any>(true);

  useEffect(() => {
    const fetchPermaLinkData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const responseUpper = await fetch(`${url}data/head/permalink/${permaLink}`);
        const upperData = await responseUpper.json();

        const responseLower = await fetch(`${url}data/category/${permaLink}`);
        const lowerData = await responseLower.json();

        const lowerImageUrls = await fetchImageUrls(lowerData.map(item => item.photo[0]));

        setUpperData(upperData);
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
          const url = await getDownloadURL(imageRef);
          return url.replace(/^http:\/\//i, 'https://'); // Replace http with https
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

  const formatContent = (content) => {
    const sections = content.split("\n\n").map((section, index) => {
      const [title, ...paragraphs] = section.split("\n");
      return (
        <div key={index} className={styles.section}>
          <p className={styles.sectionTitle}>{title}</p>
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
        <div className={styles.container}>
          <div className={styles.upperSection}>
            <div className={styles.bannerImageContainer}>
              <Image
                className={styles.bannerImage}
                src={upperData.photo[0]}
                alt={upperData.title}
                width={100}
                height={200}
              />
              <div className={styles.content}>
                {formatContent(upperData.content)}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.cardContainer}>
        {loadingRelated ? (
          <Loading />
        ) : (
          lowerData.map((item) => (
            <Link href={`/singlepage/${item.permaLink}`} key={item._id} passHref>
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
  );
};

export default PermaLink;
