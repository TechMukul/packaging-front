import React from "react";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerleft}>
        <h3>WOXN PACKAGING SOLUTION PVT. LTD.</h3>
        <p>Site II, 12/46 Sunrise Industrial Area,</p>
        <p>Loni Rd, Mohan Nagar, Ghaziabad,</p>
        <p>Uttar Pradesh 201007,India</p>
      </div>
      <div className={styles.footerright}>
        <h3>Company Location</h3>
        <div className={styles.googlemapcontainer}>
          {/* Replace the src attribute with your Google Maps iframe */}
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.276486883839!2d77.38543337375502!3d28.681374781864164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1fd36dbdcbf%3A0xeae46139050d31c0!2sWOXN%20PACKAGING%20SOLUTION%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1716019851208!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
