import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Homepage from './Homepage';
import favi from '../public/image/favi.png';
import styles from './index.module.scss'

const Index = () => {
  const [carouselData, setCarouselData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [url] = useState("https://www.api.woxnpackagingsolution.com/");

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get(`${url}data/all-category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    const fetchCarouselData = async () => {
      try {
        const response = await axios.get(`${url}carousels/all-carousel`);
        setCarouselData(response.data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchCategoriesData();
    fetchCarouselData();
  }, [url]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Woxn Packaging Solutions</title>
        <meta name="description" content="We are machines manufacturer" />
        <link rel="icon" href={favi.src} /> {/* Use the src property */}
        {/* Additional meta tags, stylesheets, etc. */}
      </Head>
      <div >
        <Homepage carouselData={carouselData} categories={categories} />
      </div>
    </div>
  );
};

export default Index;
