import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import fb from '../../public/image/fb.png';
import insta from '../../public/image/insta.webp';
import you from '../../public/image/you.png';
import whatss from '../../public/image/whatss.png';
import scanner from '../../public/image/l.png';
import scanner2 from '../../public/image/l2.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerleft}>
        <h3>WOXN PACKAGING SOLUTION PVT. LTD.</h3>
        <p>12/46, Sunrise Industrial Area,</p>
        <p>Loni Rd, Mohan Nagar, Ghaziabad,</p>
        <p>Uttar Pradesh 201007, India</p>
        <div className={styles.contactInfo}>
          {/* <h3>Contact Numbers</h3> */}
          <p ><FontAwesomeIcon icon={faPhone} className={styles.icon} /> <a href="tel:+919818293306" style={{textDecoration:"none",color:"white"}}>+91-9818293306,</a> <a href="tel:+919310352152" style={{textDecoration:"none",color:"white"}}>9310352152, </a><a href="tel:+919311452152" style={{textDecoration:"none",color:"white"}}>9311452152</a></p>
          {/* <p><FontAwesomeIcon icon={faPhone} className={styles.icon} /> </p>
          <p><FontAwesomeIcon icon={faPhone} className={styles.icon} /> </p> */}
          {/* <p><FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> <a href="mailto:pacagingsolutionindian@gmail.com">pacagingsolutionindian@gmail.com</a></p> */}
        </div>
        <div className={styles.scanners}>
          <Image src={scanner} alt="scanner" width={160} />
          <Image src={scanner2} alt="scanner" width={160} />
        </div>
       
      </div>
      <div className={styles.footercenter}>
        <h1 className={styles.quickLinksHeading}>Quick Links</h1>
        <ul className={styles.quickLinks}>
          <li>
            <Link href={"/"}>
              <div className={styles.link}>Home</div>
            </Link>
          </li>
          <li>
            <Link href={"/allCategories"}>
              <div className={styles.link}>Product</div>
            </Link>
          </li>
          <li>
            <Link href={"/videos"}>
              <div className={styles.link}>Videos</div>
            </Link>
          </li>
          <li>
            <Link href={"/about"}>
              <div className={styles.link}>About</div>
            </Link>
          </li>
          <li>
            <Link href={"/contactus"}>
              <div className={styles.link}>Contact Us</div>
            </Link>
          </li>
        </ul>
        <div className={styles.logo}>
          <h1>Social Links</h1>
        </div>
        <div className={styles.socialLinks}>
          <a href="https://wa.me/yourwhatsapplink" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <div className={styles.socialIconWrapper}>
              <Image src={whatss} alt="WhatsApp" width={27} height={40} />
            </div>
          </a>
          <a href="https://www.facebook.com/yourfacebooklink" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <div className={styles.socialIconWrapper}>
              <Image src={fb} alt="Facebook" width={27} height={40} />
            </div>
          </a>
          <a href="https://www.instagram.com/yourinstagramlink" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <div className={styles.socialIconWrapper}>
              <Image src={insta} alt="Instagram" width={30} height={40} />
            </div>
          </a>
          <a href="https://www.youtube.com/youryoutubelink" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <div className={styles.socialIconWrapper}>
              <Image src={you} alt="YouTube" width={40} height={40} />
            </div>
          </a>
        </div>
      </div>
      <div className={styles.footerright}>
        <div className={styles.mapcontainer}>
          <div className={styles.mapoverlay}></div>
          <h2>Mapped location</h2>
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.276486883839!2d77.38543337375502!3d28.681374781864164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1fd36dbdcbf%3A0xeae46139050d31c0!2sWOXN%20PACKAGING%20SOLUTION%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1716019851208!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className={styles.mapinfo}>
            <div className={styles.mapicon}></div>
            <div className={styles.maptext}>
              <p>Find Us Here</p>
              <a
                href="https://goo.gl/maps/ABC123"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
