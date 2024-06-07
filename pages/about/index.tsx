import React, { useEffect, useState } from "react";
import styles from "./About.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import Factory from '../../public/image/Untitled design (2).webp'
import axios from 'axios'
import Image from "next/image";

const About = ({ Categories,url }) => {
  const [carouselData, setCarouselData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url ="https://www.api.woxnpackagingsolution.com";
        const carouselResponse = await axios.get(`${url}/carousels/all-carousel`);
        const categoriesResponse = await axios.get(`${url}/data/all-category`);

        setCarouselData(carouselResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <Navbar Categories={Categories} /> */}
      <h2>ewqrqoi{url}</h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>ABOUT US</h1>
          <Image src={Factory} alt="factory" className={styles.image} />
        </div>

        <div className={styles.section}>
          <h2>Our Company</h2>
          <p>
           Woxn Packaging Solution Pvt. Ltd. is amongst the top-notch players in the food processing industry. We manufacture and export a complete spectrum of food processing plant, packaging and bottling equipment. Our all-round expertise also includes providing consultancy services to the government department for setting up food processing plants.
          </p>
          <p>
            We have established a sound infrastructural facility, which is equipped with the latest machines such as welding machines, shaft grinders, cutters, drill machines, and surface grinders. Our products are tested on well-defined quality parameters to guarantee a defect-free and highly effective range to our valued clients. We also provide complete customization to suit the varied application requirements of the clients. We provide packaging machines, food processing machines, and extraction equipment.
          </p>
          <p>
            We have carved a niche for ourselves in the industry under the dynamic leadership of Mr. Puneet Sharma, who is the owner of our company and has 12 years of vast experience in this field. Further, we have employed a diligent team who assist us in offering the best quality food processing machines, bottling equipment, and packaging solutions.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Company Factsheet</h2>
          <div className={styles.fact}>
            <strong>Nature of Business:</strong> Exporter and Manufacturer
          </div>
          <div className={styles.fact}>
            <strong>Additional Business:</strong> Exporter
          </div>
          <div className={styles.fact}>
            <strong>Company CEO:</strong> Pankaj Sharma
          </div>
          <div className={styles.fact}>
            <strong>Registered Address:</strong> 12/46, Sun Rise Industrial Area, Loni Road Site - 2, Mohan Nagar, Sahibabad- 201 005, Uttar Pradesh, India
          </div>
          <div className={styles.fact}>
            <strong>Total Number of Employees:</strong> 26 to 50 People
          </div>
          <div className={styles.fact}>
            <strong>Year of Establishment:</strong> 2004
          </div>
          <div className={styles.fact}>
            <strong>Legal Status of Firm:</strong> Individual - Proprietor
          </div>
          <div className={styles.fact}>
            <strong>Annual Turnover:</strong> Rs. 2 - 5 Crore
          </div>
        </div>

        <div className={styles.section}>
          <h2>Top Export Countries</h2>
          <ul>
            <li>Nepal</li>
            <li>Sri Lanka</li>
            <li>Bangladesh</li>
            <li>Tanzania</li>
            <li>Uganda</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Statutory Profile</h2>
          <div className={styles.fact}>
            <strong>Import Export Code (IEC):</strong> 05090*****
          </div>
          <div className={styles.fact}>
            <strong>Tan No.:</strong> MRTP0*****
          </div>
          <div className={styles.fact}>
            <strong>Banker:</strong> ICICI BANK LTD, ICICI BANK LTD
          </div>
          <div className={styles.fact}>
            <strong>GST No.:</strong> 09AWOPS3792B1Z1
          </div>
        </div>

        <div className={styles.section}>
          <h2>Packaging/Payment and Shipment Details</h2>
          <div className={styles.fact}>
            <strong>Payment Mode:</strong> Cash, Cheque, DD
          </div>
          <div className={styles.fact}>
            <strong>Shipment Mode:</strong> By Road, By Sea, By Cargo
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

// export async function getServerSideProps() {
//   try {
//     const url ="https://www.api.woxnpackagingsolution.com";
//     const response = await fetch(
//       `${url}/carousels/all-carousel`
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch carousel data. Status: ${response.status}`
//       );
//     }

//     const carouselData = await response.json();

//     const categoriesResponse = await fetch(
//       `${url}/data/all-category`
//     );

//     if (!categoriesResponse.ok) {
//       throw new Error(
//         `Failed to fetch categories data. Status: ${categoriesResponse.status}`
//       );
//     }

//     const Categories = await categoriesResponse.json();

//     return {
//       props: {
//         url,
//         carouselData,
//         Categories,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         carouselData: null,
//         Categories: null,
//       },
//     };
//   }
// }
