import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./PermaLink.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import Loading from "../Loading";
import Enquire from "../../component/Enquire/Enquire";
import Image from "next/image";
import lower from '../../public/image/lower.jpg'
import lower1 from '../../public/image/lower1.jpg'
const firebaseConfig = {
  apiKey: "AIzaSyD3NQqtRWs1weSryxTCjpoGgLn-l5KdjQM",
  authDomain: "woxnpackaging.firebaseapp.com",
  projectId: "woxnpackaging",
  storageBucket: "woxnpackaging.appspot.com",
  messagingSenderId: "727828228447",
  appId: "1:727828228447:web:554b313dcd3df6c67a6eea",
  measurementId: "G-8HF5CJ9Y3Q",
};

const storage = getStorage(initializeApp(firebaseConfig));

const PermaLink = ({ Categories }) => {
  const router = useRouter();
  const { permaLink } = router.query;

  const [upperData, setUpperData] = useState<any>(null);
  const [lowerData, setLowerData] = useState<any>([]);
  const [loadingRelated, setLoadingRelated] = useState<any>(true);
  const [mainImageIndex, setMainImageIndex] = useState<any>(0);
  const [videoUrl, setVideoUrl] = useState<any>("");
  const videoRef = useRef<any>(null);
  const intersectionObserver = useRef<any>(null);

  useEffect(() => {
    const fetchPermaLinkData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_APIVAL;
        const responseUpper = await fetch(
          `${url}data/head/permalink/${permaLink}`
        );
        const upperData = await responseUpper.json();

        const responseLower = await fetch(`${url}data/category/${permaLink}`);
        const lowerData = await responseLower.json();

        const upperImageUrls = await fetchImageUrls(upperData.photo);
        const lowerImageUrls = await fetchImageUrls(
          lowerData.map((item) => item.photo[0])
        );

        setUpperData({
          ...upperData,
          photo: upperImageUrls,
        });
        setLowerData(
          lowerData.map((item, index) => ({
            ...item,
            photo: [lowerImageUrls[index]],
          }))
        );
        setLoadingRelated(false);
        setVideoUrl(upperData.video); // Assume videoUrl is part of the upperData response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (permaLink) {
      fetchPermaLinkData();
    }
  }, [permaLink]);

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      handleIntersection,
      {
        threshold: 0.5, // Example threshold
      }
    );

    if (videoRef.current) {
      intersectionObserver.current.observe(videoRef.current);
    }

    return () => {
      if (intersectionObserver.current && videoRef.current) {
        intersectionObserver.current.unobserve(videoRef.current);
      }
    };
  }, [videoRef.current]);

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

  const formatTitle = (link) => link.replace(/-/g, " ").toUpperCase();

  const handleThumbnailClick = (index) => setMainImageIndex(index);

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

  const handleScroll = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target.querySelector("iframe");
        if (iframe) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        }
      } else {
        const iframe = entry.target.querySelector("iframe");
        if (iframe) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      }
    });
  };

  const handleIntersection = (entries) => {
    handleScroll(entries);
  };
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
  if (!upperData) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>{formatTitle(upperData.title)}</h1>
        <div className={styles.upperSection}>
          <div className={styles.thumbnailContainer}>
            {upperData.photo.map((image, index) => (
              <img
                key={index}
                className={`${styles.thumbnail} ${
                  index === mainImageIndex ? styles.activeThumbnail : ""
                }`}
                src={image}
                alt={`${upperData.title} ${index + 1}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <div className={styles.leftSection}>
            <img
              src={upperData.photo[mainImageIndex]}
              alt="img"
              className={styles.mainImage}
            />
          </div>
          <div className={styles.content}>
            {formatContent(upperData.content)}
            <div style={{display:"flex",gap:"10px"}}>
              <Image src={lower} alt="" height={50} width={50} style={{border:"1px solid black"}}></Image>
              <Image src={lower1} alt="" height={50} width={50} style={{border:"1px solid black"}}></Image>
              <Image src={lower1} alt="" height={50} width={50} style={{border:"1px solid black"}}></Image>
              <Image src={lower} alt="" height={50} width={50} style={{border:"1px solid black"}}></Image>
            </div>
          </div>
        </div>
        <div className={styles.relatedProducts}>
          <h1 className={styles.relatedProductsTitle}>Related Products</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Machine Varieties</th>
                {/* <th>Capacity</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loadingRelated ? (
                <tr>
                  <td colSpan={4}>
                    <Loading />
                  </td>
                </tr>
              ) : (
                lowerData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    {/* <td>{item.capacity}</td> */}
                    <td>
                      <button
                        className={styles.requestQuoteButton}
                        onClick={() => sendWhatsAppMessage(item.title)}
                      >
                        Request Quote
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {videoUrl && (
          <div ref={videoRef} className={styles.videoContainer}>
            <iframe
              width="100%"
              height="550"
              src={`${videoUrl}?enablejsapi=1`}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <Enquire />
    </>
  );
};

export default PermaLink;
