import React, { useEffect, useState } from 'react';
import Homepage from './Homepage';
import Head from 'next/head';
import axios from 'axios';

const Index = () => {
  const [carouselData, setCarouselData] = useState(null);
  // const [Categories, setCategories] = useState(null);
  const [url] = useState("https://www.api.woxnpackagingsolution.com/");

  useEffect(() => {

    const fetchCategoriesData = async () => {
   
    };
    const fetchCarouselData = async () => {
      try {
        const response = await axios.get(`${url}carousels/all-carousel`);
        setCarouselData(response.data);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

   

    fetchCarouselData();

  }, [url]);
// console.log(Categories)
  return (
    <>
      <Head>
        <title>Woxn Packaging Solutions</title>
        <meta name="description" content="We are machines manufacturer" />
        {/* Additional meta tags, stylesheets, etc. */}
      </Head>
      <div>
        <Homepage  carouselData={carouselData} />
      </div>
    </>
  );
};

export default Index;
