import React, { lazy, Suspense } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Content from "../../component/Content/Content";
import Categories from "../../component/Categories/Categories";
import Feature from "../../component/Featuredproduct/Feature";
import Banner from "../../component/Banner/Banner";
import Enquire from "../../component/Enquire/Enquire";
import Partners from "../../component/Partners/Partners";
import Footer from "../../component/Footer/Footer";
import WhatsApp from "../../component/whatsapp/whatsapp";
import Search from "../../component/Search/Search";
import Carousel from "../../component/Carousel/Carousel";
import styles from "./index.module.scss";
import Development from "../../component/Development/Development";
import Client from "../../component/Client/Client";

// Lazy load the Carousel component
const LazyCarousel = lazy(() => import("../../component/Carousel/Carousel"));

const Homepage = ({ carouselData, categories }) => {
  console.log(carouselData);
  return (
    <div >
      <Navbar />
      {/* <Search /> */}
      {/* Wrap the lazy-loaded component in Suspense */}
      <Carousel carouselData={carouselData} />
      <WhatsApp />
      <Content />
      <Categories />
      <Feature />

      <Client />
      <Banner />

      <Partners />

      <Development />

      <Enquire />
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
