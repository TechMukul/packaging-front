import React, { useEffect, useState } from "react";
import styles from "./About.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import axios from 'axios';
import Image from "next/image";
import factory from '../../public/image/Untitled design (2).webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faUsers,faClock, faMapMarkerAlt, faBriefcase, faCheckCircle, faGlobe, faFileAlt, faMoneyBillWave, faShip } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [carouselData, setCarouselData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://www.api.woxnpackagingsolution.com";
        const carouselResponse = await axios.get(`${apiUrl}/carousels/all-carousel`);
        const categoriesResponse = await axios.get(`${apiUrl}/data/all-category`);

        setCarouselData(carouselResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const TextWithAnimation = ({ children }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <div
        ref={ref}
        className={`${styles.textContainer} ${inView ? styles.animate : ''}`}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      
      <div className={styles.banner}>
        <Image 
          src="https://www.nextvisual.com.my/wp-content/uploads/2017/11/about-us-banner-background-02-min.jpg" 
          alt="banner" 
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.bannerImage}
        />
        <div className={styles.bannerText}>
          <h1>Welcome to Woxn Packaging Solution</h1>
          <h2>Leader in Food Processing Plant Setups</h2>
        </div>
      </div>
      <div className={styles.pageTitle}>
        Home &nbsp; - About Us
      </div>
      <div className={styles.container}>
        <div className={styles.aboutSection}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /> About Us</h2>
            <p style={{ textAlign: "justify" }} className={styles.para}>
              Woxn Packaging Solution is a premier Food Processing Machine Manufacturing Company with over 12 years of unparalleled experience in delivering efficient and reliable machines to the industry. Our state-of-the-art solutions have been instrumental in helping organizations maximize their profits and establish themselves as leading brands in their respective segments.
              <br /><br />
              We pride ourselves on offering fully turnkey solutions tailored to the unique needs of our clients in the food sector. Our commitment to excellence ensures that we help our clients not only enhance their operational efficiency but also significantly strengthen their brand image in the highly competitive market. From initial consultation to final implementation, we provide comprehensive support to ensure our clients achieve their business goals. Our innovative and sustainable packaging solutions are designed to meet the highest industry standards, making Woxn Packaging Solution the preferred partner for food processing companies looking to achieve remarkable growth and success.
            </p>
          </TextWithAnimation>
          <div className={styles.imageContainer}>
            <Image src={factory} alt="factory" className={styles.image} width={800} height={400} />
          </div>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faCheckCircle} className={styles.icon} /> Why Our Solutions?</h2>
            <p className={styles.para}>We provide fully turnkey solutions for various food products like Mayonnaise, Tomato sauce and ketchup, Canning retort, Roasted Makhana, Non-dairy whipped cream, Premixes, Fruit juice, and carbonated drinks.</p>
            <p>We are committed to empowering food processing machines, ensuring our clients receive reliable, efficient, and customized solutions in their segments.</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /> Basic Information</h2>
            <div className={styles.fact}>
              <strong>Nature of Business:</strong> Service Provider
            </div>
            <div className={styles.fact}>
              <strong>Business Location:</strong> Delhi, India
            </div>
            <div className={styles.fact}>
              <strong>Year of Establishment:</strong> 2015
            </div>
            <div className={styles.fact}>
              <strong>No. of Employees:</strong> 35
            </div>
            <div className={styles.fact}>
              <strong>GST No.:</strong> 09AWOPS3792B1Z1
            </div>
            <div className={styles.fact}>
              <strong>Branches:</strong> Uttar Pradesh
            </div>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faGlobe} className={styles.icon} /> Our Vision</h2>
            <p className={styles.para}>Our vision is to revolutionize food processing machines, making them sustainable and efficient in the Food Sector. We aim to empower cutting-edge technology, enhance product quality, and provide customized solutions.</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faShip} className={styles.icon} /> Our Mission</h2>
            <p className={styles.para}>We are committed to empowering food processing machines for different types of products like Mayonnaise, Tomato sauce, Ketchup, Beverages, Canning retort, Makhana roaster. Our clients receive reliable, efficient, and customized solutions in their segments.</p>
            <ul className={styles.list}>
              <li>Fully turnkey solutions for various food products</li>
              <li>Effective, reliable, and efficient food processing machines</li>
            </ul>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /> Company Factsheet</h2>
            <div className={styles.fact}>
              <strong>Nature of Business:</strong> Exporter and Manufacturer
            </div>
            <div className={styles.fact}>
              <strong>Registered Address:</strong> 12/46, Sun Rise Industrial Area, Loni Road Site - 2 Industrial Area, Ghaziabad - 201007, Uttar Pradesh, India
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
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faGlobe} className={styles.icon} /> Top Export Countries</h2>
            <ul className={styles.list}>
              <li>Nepal</li>
              <li>Sri Lanka</li>
              <li>Bangladesh</li>
              <li>Tanzania</li>
              <li>Uganda</li>
            </ul>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faShip} className={styles.icon} /> Statutory Profile</h2>
            <div className={styles.fact}>
              <strong>Banker:</strong> ICICI BANK LTD
            </div>
            <div className={styles.fact}>
              <strong>PAN No.:</strong> AWOPS3792B
            </div>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /> Trade & Market</h2>
            <ul className={styles.list}>
              <li>East/Middle Africa</li>
              <li>South/West Africa</li>
              <li>South-East Asia</li>
              <li>East Asia</li>
              <li>South America</li>
            </ul>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faCheckCircle} className={styles.icon} /> Quality Measures / Testing Facilities</h2>
            <p>We maintain a stringent quality policy in our operations, ensuring each machine undergoes rigorous testing before being delivered to clients.</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /> Legal Status of Firm</h2>
            <p className={styles.para}>Proprietorship Firm</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faGlobe} className={styles.icon} /> Company USP</h2>
            <p className={styles.para}>Expertise in food processing machines and customized solutions.</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faMoneyBillWave} className={styles.icon} /> Annual Turnover</h2>
            <p className={styles.para}>Rs. 2 - 5 Crore Approx.</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faShip} className={styles.icon} /> Banker</h2>
            <p className={styles.para}>ICICI Bank</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faFileAlt} className={styles.icon} /> Packaging/Payment and Shipment Details</h2>
            <ul className={styles.list}>
              <li>Payment Mode: Cash, Cheque, DD, Online, Bank Transfer</li>
              <li>Shipment Mode: By Road, By Sea, By Air</li>
            </ul>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faFileAlt} className={styles.icon} /> Payment Mode</h2>
            <ul className={styles.list}>
              <li>Cash</li>
              <li>Cheque</li>
              <li>DD</li>
              <li>Online</li>
              <li>Bank Transfer</li>
            </ul>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faShip} className={styles.icon} /> Shipment Mode</h2>
            <ul className={styles.list}>
              <li>By Road</li>
              <li>By Sea</li>
              <li>By Air</li>
            </ul>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faClock} className={styles.icon} /> Estimated Time of Delivery</h2>
            <p>7 to 10 Days</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faFileAlt} className={styles.icon} /> Trade Memberships</h2>
            <p>Export Promotion Council</p>
          </TextWithAnimation>
        </div>

        <div className={styles.section}>
          <TextWithAnimation>
            <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faIndustry} className={styles.icon} /> Year of Establishment</h2>
            <p>2004</p>
          </TextWithAnimation>
        </div>
      </div>
    </>
  );
};

export default About;
