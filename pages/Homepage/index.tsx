import React, { lazy, Suspense } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Content from "../../component/Content/Content";
import Categories from "../../component/Categories/Categories";
import Feature from "../../component/Featuredproduct/Feature";
import Banner from "../../component/Banner/Banner";
import Enquire from "../../component/Enquire/Enquire";
import Patners from "../../component/Partners/Partners";
import Footer from "../../component/Footer/Footer";
import WhatsApp from "../../component/whatsapp/whatsapp";
import Search from "../../component/Search/Search";

// Lazy load the Carousel component
const LazyCarousel = lazy(() => import("../../component/Carousel/Carousel"));

const index = ({ carouselData  }) => {
  // console.log("cccc",carouselData);
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      <Search />
      {/* Wrap the lazy-loaded component in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCarousel carouselData={carouselData} />
      </Suspense>
      <WhatsApp />
      <Content />
      {/* <Categories category={Category}/> */}
      <Feature />
      <Banner />
      <Patners />
      <Enquire />
      <Footer />
    </div>
  );
};

export default index;


