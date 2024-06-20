import React, { useEffect, useRef, useState } from "react";
import styles from "./contact.module.scss";
import Navbar from "../../component/Navbar/Navbar";
import Image from "next/image";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";

const Contact = ({ Categories }) => {
  const [isSticky, setIsSticky] = useState<any>(false);
  const contactCardRef = useRef<any>(null);
  const formContainerRef = useRef<any>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (contactCardRef.current && formContainerRef.current) {
  //       const contactCardBottom =
  //         contactCardRef.current.offsetTop +
  //         contactCardRef.current.offsetHeight;
  //       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //       setIsSticky(scrollTop > contactCardBottom);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="We are machines manufacturer" />
      </Head>
      <Navbar />

      <div className={styles.container}>
        <Image
          src="https://t4.ftcdn.net/jpg/02/16/47/49/360_F_216474977_WJLkwxJAqyeW3QJswJ0C2JgNQsJNSzCo.jpg"
          alt="Contact Us"
          layout="responsive"
          width={1248}
          height={300}
          className={styles.headerImage}
        />
        <div className={styles.pageTitle}>
          Home &nbsp; - Contact Us
        </div>
        <div className={styles.header}>
          <h1>Contact Us</h1>
        </div>

        <div className={styles.section}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard} ref={contactCardRef}>
              <p className={styles.quote}>
                {/* <FontAwesomeIcon icon={faQuoteLeft} className={styles.icon} />   */}
                Get a Quote
              </p>
              <p className={styles.description}>
                For over 12 years, Woxn Packaging Solutions has been at the forefront of the packaging industry, delivering innovative and sustainable solutions that redefine excellence. Founded by a team of visionary technocrats and seasoned engineers, our journey has been fueled by a relentless pursuit of quality and innovation. We are committed to providing cutting-edge packaging solutions tailored to meet the unique needs of our clients, ensuring that every product we deliver not only meets but exceeds expectations. Our dedication to excellence has earned us a reputation for reliability and superior performance in the industry. Join us at Woxn Packaging Solutions and experience the difference that expertise, innovation, and commitment can make for your brand.
              </p>
              <strong>Pankaj Sharma (CEO)</strong>
              <p>
                <div className={styles.contactDetail}>
                  <strong>Address </strong>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    height={20}
                    width={40}
                    color="#0056b3"
                    style={{ marginRight: "10px", marginTop: "3px" }}
                  />
                  Woxn Packaging Solution (A Unit Of Woxn Packaging Solution Pvt. Ltd.)
                  <br />
                  12/46, Sunrise Industrial Area, Loni Road, Site- 2, Mohan Nagar,
                  <br />
                  Loni Industrial Area, Ghaziabad - 201007, Uttar Pradesh, India
                  <br />
                  <a
                    href="https://www.google.com/maps?q=12/46,+Sunrise+Industrial+Area,+Loni+Road,+Site-2,+Mohan+Nagar,+Loni+Industrial+Area,+Ghaziabad+-+201007,+Uttar+Pradesh,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Get Direction
                  </a>
                </div>
              </p>
              <p>
                <div className={styles.contactDetail}>
                  <strong>Call Us </strong>
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    height={20}
                    width={40}
                    style={{
                      marginRight: "10px",
                      marginTop: "3px",
                      transform: "rotate(90deg)",
                    }}
                    color="#0056b3"
                  />
                  <a href="tel:+919818293306" className={styles.link}>
                    +91-9818293306
                  </a>
                  <br />
                  <a href="tel:+919310352152" className={styles.link}>
                    +91-9310352152
                  </a>
                  <br />
                  <a href="tel:+919311452152" className={styles.link}>
                    +91-9311452152
                  </a>
                </div>
              </p>
              <p>
                <div className={styles.contactDetail}>
                  <strong>Email </strong>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    height={20}
                    width={40}
                    style={{ marginRight: "10px", marginTop: "3px " }}
                    color="#0056b3"
                  />
                  <a
                    href="mailto:packagingsolutionindia@gmail.com"
                    className={styles.link}
                  >
                    packagingsolutionindia@gmail.com
                  </a>
                </div>
              </p>
            </div>

            <div
              className={`${styles.formContainer} ${
                isSticky ? styles.sticky : ""
              }`}
              ref={formContainerRef}
            >
              <h3>Have Any Query?</h3>
              <form>
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="tel" name="phone" placeholder="Phone" required />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  required
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Our Location</h2>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14029.630781213888!2d77.41015692984417!3d28.669156685582957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf00ef1d853fd%3A0x5b5d59de536f7807!2s12%2F46%2C%20Sunrise%20Industrial%20Area%2C%20Loni%20Road%2C%20Site-2%2C%20Mohan%20Nagar%2C%20Loni%20Industrial%20Area%2C%20Ghaziabad%20-%20201007%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1611148262943!5m2!1sen!2sus"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
