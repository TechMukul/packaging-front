import React, { useEffect, useState } from "react";
import styles from "./PermaLink.module.scss";
import Link from "next/link";
import Navbar from "../../component/Navbar/Navbar";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
// import { Head } from "next/document";

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

const PermaLink = ({ permaLink, upperData, lowerData, Categories }) => {
  console.log(lowerData)
  const formatTitle = (link) => {
    return link.replace(/-/g, " ").toUpperCase();
  };

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loadingRelated, setLoadingRelated] = useState(true); // Loading state for related products

  useEffect(() => {
    setLoadingRelated(false); // Set loading to false when related products are loaded
  }, [lowerData]);

  const handleImageClick = (index) => {
    setMainImageIndex(index);
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
     {/* <Head>
        <title></title>
        <meta name="description" content="We are machines manufacturer" />
      </Head> */}
    {/* <Navbar Categories={Categories}/> */}
      <h1 className={styles.title} style={{ textAlign: "center", fontWeight: "bold", fontFamily: "" }}>
        {formatTitle(upperData.title)}
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
      <>
        <h1 style={{ textAlign: "center" }}>Related Products</h1>
        <div className={styles.cardcontainer}>
          {loadingRelated ? ( // Show loading indicator while related products are being fetched
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
const fetchUpperImageUrls = async (photoUrls) => {
  try {
    const upperImageUrls = await Promise.all(
      photoUrls.map(async (photoUrl) => {
        const imageRef = ref(storage, photoUrl);
        return getDownloadURL(imageRef);
      })
    );
    return upperImageUrls;
  } catch (error) {
    console.error("Error fetching upper image URLs:", error);
    return [];
  }
};

// Fetching image URLs from Firebase Storage for lowerData
const fetchLowerImageUrls = async (items) => {
  try {
    const lowerImageUrls = await Promise.all(
      items.map(async (item) => {
        const imageRef = ref(storage, item.photo[0]);
        return getDownloadURL(imageRef);
      })
    );
    return lowerImageUrls;
  } catch (error) {
    console.error("Error fetching lower image URLs:", error);
    return [];
  }
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { permaLink } = params;

  try {
    const responseUpper = await fetch(
      `https://woxnbackend.onrender.com/data/head/permalink/${permaLink}`
    );
  
    const upperData = await responseUpper.json();

    const responseLower = await fetch(
      `https://woxnbackend.onrender.com/data/category/${permaLink}`
    );
   
    const lowerData = await responseLower.json();

    const categoriesResponse = await fetch("https://woxnbackend.onrender.com/data/all-category");

    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories data. Status: ${categoriesResponse.status}`);
    }

    const Categories = await categoriesResponse.json();
   // Fetching image URLs for upperData and lowerData
   const upperImageUrls = await fetchUpperImageUrls(upperData.photo);
   const lowerImageUrls = await fetchLowerImageUrls(lowerData);

   // Updating the upperData object with image URLs
   const updatedUpperData = {
     ...upperData,
     photo: upperImageUrls
   };

   // Updating the lowerData array with image URLs
  //  const updatedLowerData = lowerData.map((item, index) => ({
  //    ...item,
  //    photo: [lowerImageUrls[index]]
  //  }));
    // Fetching image URLs from Firebase Storage for upperData
    // const upperImageUrls = await Promise.all(
    //   upperData.photo.map(async (photoUrl) => {
    //     const imageRef = ref(storage, photoUrl);
    //     return getDownloadURL(imageRef);
    //   })
    // );

    // // Fetching image URLs from Firebase Storage for lowerData
    // const lowerImageUrls = await Promise.all(
    //   lowerData.map(async (item) => {
    //     const imageRef = ref(storage, item.photo[0]);
    //     return getDownloadURL(imageRef);
    //   })
    // );

    // // Updating the upperData object with image URLs
    // const updatedUpperData = {
    //   ...upperData,
    //   photo: upperImageUrls
    // };

    // Updating the lowerData array with image URLs
    const updatedLowerData = lowerData.map((item, index) => ({
      ...item,
      photo: [lowerImageUrls[index]]
    }));

    return {
      props: {
        permaLink,
       upperData:updatedUpperData,
        lowerData:updatedLowerData,
        Categories
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        permaLink,
        upperData: null,
        lowerData: null,
      },
    };
  }
}
