import React from 'react';
import Homepage from './Homepage';
import Head from 'next/head';

const HomePage = ({ carouselData, Categories }) => {
  return (<>
   <Head>
        <title>Woxn Packaging Solutions</title>
        <meta name="description" content="We are machines manufacturer" />
        {/* Additional meta tags, stylesheets, etc. */}
      </Head>
    <div>
      <Homepage Category={Categories} carouselData={carouselData} />
    </div>
    </>
  );
};

export default HomePage;

export async function getServerSideProps() {
  try {
    const response = await fetch("https://woxnbackend.onrender.com/carousels/all-carousel");

    if (!response.ok) {
      throw new Error(`Failed to fetch carousel data. Status: ${response.status}`);
    }

    const carouselData = await response.json();

    const categoriesResponse = await fetch("https://woxnbackend.onrender.com/data/all-category");

    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories data. Status: ${categoriesResponse.status}`);
    }

    const Categories = await categoriesResponse.json();

    return {
      props: {
        carouselData,
        Categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        carouselData: null,
        Categories: null,
      },
    };
  }
}
