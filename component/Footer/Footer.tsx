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
import { faHome, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerleft}>
        <h3>WOXN PACKAGING SOLUTION PVT. LTD.</h3>
        <p>
            <FontAwesomeIcon icon={faHome} className={styles.icon} /> &nbsp;
        12/46, Sunrise Industrial Area,</p>
        <p>Loni Rd, Mohan Nagar, Ghaziabad,</p>
        <p>Uttar Pradesh 201007, India</p>
        <div className={styles.contactInfo}>
          {/* <h3>Contact Numbers</h3> */}
          <p >
            <FontAwesomeIcon icon={faPhone} className={styles.icon} /> &nbsp;
            <a href="tel:+919818293306" style={{textDecoration:"none",color:"white"}}>+91-9818293306,</a> <a href="tel:+919310352152" style={{textDecoration:"none",color:"white"}}>9310352152, </a><a href="tel:+919311452152" style={{textDecoration:"none",color:"white"}}>9311452152</a></p>
          {/* <p><FontAwesomeIcon icon={faPhone} className={styles.icon} /> </p>
          <p><FontAwesomeIcon icon={faPhone} className={styles.icon} /> </p> */}
          {/* <p><FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> <a href="mailto:pacagingsolutionindian@gmail.com">pacagingsolutionindian@gmail.com</a></p> */}
        </div>
        <div className={styles.scanners}>
          <Image src={scanner} alt="scanner" width={160} />
          <Image src={scanner2} alt="scanner" width={160} />

        </div>
        <br />
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
      <div className={styles.footercenter}>
      <h1 className={styles.quickLinksHeading}>Certifications</h1>
        <div style={{display:"flex",gap:"5px"}}>
        <Image src={"https://www.joseloffgallery.org/wp-content/uploads/2019/09/iso-1080x675.jpg"} alt="pic" width={130} height={100}></Image>
        <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnEdorkgiLSWsFL38xLqkHTuUCVXtuMzPILw&s"} alt="pic" width={130} height={100}></Image>
        </div>
        <div style={{display:"flex",gap:"5px",marginTop:"5px"}}>
        <Image src={"https://5.imimg.com/data5/KS/RU/JK/SELLER-83054718/msme-certificate-500x500.jpg"} alt="pic" width={130} height={100}></Image>
        <Image src={"data:image/jpeg;base64,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"} alt="pic" width={130} height={100}></Image>
        </div>
        {/* 
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
        </div> */}
       
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
