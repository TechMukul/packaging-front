import React from "react";
import styles from "./contact.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import location from '../../public/image/location.png'
import whatss from '../../public/image/whatss.png'
import Image from "next/image";
import Head from "next/head";

const Contact = ({ Categories }) => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="We are machines manufacturer" />
        {/* Additional meta tags, stylesheets, etc. */}
      </Head>
      {/* <Navbar Categories={Categories} /> */}
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Contact Us</h1>
        </div>

        <div className={styles.section}>
          <h2>Contact Person</h2>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <strong style={{fontSize:"30px"}}>Pankaj Sharma (CEO)</strong>
              
              <p>
              
                <strong style={{marginRight:"10px",fontSize:"30px"}}>Address</strong> 
                <Image src={location} alt="location" width={30}></Image>
                <br />
                Packaging Solution (A Unit Of Woxn Packaging Solution Pvt. Ltd.)
                <br />
                12/46, Sunrise Industrial Area, Loni Road, Site- 2, Mohan Nagar,
                <br />
                Loni Industrial Area, Ghaziabad - 201007, Uttar Pradesh, India
                <br />
                <a href="https://www.google.com/maps?q=12/46,+Sunrise+Industrial+Area,+Loni+Road,+Site-2,+Mohan+Nagar,+Loni+Industrial+Area,+Ghaziabad+-+201007,+Uttar+Pradesh,+India" target="_blank" rel="noopener noreferrer">Get Direction</a>
              </p>
              <p>
                <strong style={{marginRight:"10px",fontSize:"30px"}}> Call Us</strong> 
                <Image src={whatss} alt="location" width={30}></Image>
                <br />
                <a href="tel:+919818293306">+91-9818293306</a> <br /><a href="tel:+919310352152">+91-9310352152</a><br /> <a href="tel:+919311452152">+91-9311452152</a> 
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Our Location</h2>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14029.630781213888!2d77.41015692984417!3d28.669156685582957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf00ef1d853fd%3A0x5b5d59de536f7807!2s12%2F46%2C%20Sunrise%20Industrial%20Area%2C%20Loni%20Road%2C%20Site-2%2C%20Mohan%20Nagar%2C%20Loni%20Industrial%20Area%2C%20Ghaziabad%20-%20201007%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1611148262943!5m2!1sen!2sus"
            // allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;

export async function getServerSideProps() {
  try {
    const categoriesResponse = await fetch(
      `${process.env.apival}/data/all-category`
    );

    if (!categoriesResponse.ok) {
      throw new Error(
        `Failed to fetch categories data. Status: ${categoriesResponse.status}`
      );
    }

    const Categories = await categoriesResponse.json();

    return {
      props: {
        Categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        Categories: null,
      },
    };
  }
}
