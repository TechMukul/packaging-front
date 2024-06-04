import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './index.module.scss'; // Import CSS module
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
interface CarouselData {
  image: string;
}
type Props={
  carouselData: CarouselData[];
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const Index = ({ carouselData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const urls = await Promise.all(
          carouselData.map(async (carousel) => {
            const imageRef = ref(storage, carousel.image);
            return getDownloadURL(imageRef);
          })
        );

        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    if (carouselData) {
      fetchImageUrls();
    }
  }, [carouselData, storage]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  if (!carouselData || imageUrls.length !== carouselData.length) {
    return <h1>Loading</h1>;
  }

  return (
    <div className={styles['carousel-container']}>
      <button className={`${styles['arrow-button']} ${styles['prev']}`} onClick={prevSlide}>
        &#10094;
      </button>
      <div className={styles['carousel-slide']}>
        {imageUrls.map((imageUrl, index) => (
          <Image
            key={carouselData[index]._id}
            src={imageUrl}
            alt={`Slide ${index}`}
            width={600}
            height={400}
            className={index === currentIndex ? styles['active'] : styles['inactive']}
          />
        ))}
      </div>
      <button className={`${styles['arrow-button']} ${styles['next']}`} onClick={nextSlide}>
        &#10095;
      </button>
      <div className={styles['indicators']}>
        {carouselData.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? styles['active'] : ''}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
