import React, { useEffect, useState } from "react";
import image from "../../public//image/WhatsApp Image 2024-05-21 at 7.46.54 AM.svg";
import Gem from "../../public/image/Gem.jpg";
import ISO from "../../public/image/ISO.jpg";
import fb from "../../public/image/fb.svg";
import insta from "../../public/image/insta.svg";
import you from "../../public/image/you.png";
import email from "../../public/image/email.svg";
import phone from "../../public/image/whattt.svg";
import threelines from "../../public/image/three lines.svg";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios'
// import email from '../../public/image/email.png'
// import location from "../../public/image/location.png";
const Navbar = () => {

  const [Categories, setCategories] = useState<any>(null);
  const [url] = useState("https://www.api.woxnpackagingsolution.com/");

  useEffect(() => {

    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get(`${url}data/all-category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchCategoriesData();
  }, [url]);
  const [showMenu, setShowMenu] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleShowAllCategories = () => { 
    setShowAllCategories(!showAllCategories);
  };
  if(showMenu===true){
    return(<>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <Image
          src={image}
          alt="pic"
          style={{ width: "100%", height: "80px", objectFit: "contain" }}
        />
    </div>
</div>
<div style={{ padding: "0 20px" }}>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "center" }}>
        <Link href={"/"}><li style={{ padding: "10px 0", fontSize: "18px", borderBottom: "1px solid #ccc" }}>Home</li></Link>
        <Link href={"/allCategories"}><li style={{ padding: "10px 0", fontSize: "18px", borderBottom: "1px solid #ccc" }}>Product</li></Link>
        <Link href={"/videos"}><li style={{ padding: "10px 0", fontSize: "18px", borderBottom: "1px solid #ccc" }}>Videos</li></Link>
        <Link href={"/about"}><li style={{ padding: "10px 0", fontSize: "18px", borderBottom: "1px solid #ccc" }}>About us</li></Link>
        <Link href={"/contactus"}><li style={{ padding: "10px 0", fontSize: "18px", borderBottom: "1px solid #ccc" }}>Contact Us</li></Link>
    </ul>
</div>
</>
)
  }
  const renderCategoriesDropdown = () => {
    return (
      <div className={styles.dropdown}>
        {Categories&&
        Categories.slice(0, 8).map((category) => (
          <Link key={category._id} href={`/category/${category.permaLink}`}>
            {category.name}
          </Link>
        ))}
        <Link href="/allCategories">
          <button>View all </button>
        </Link>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "120px",
        backgroundColor: "white",
      }}
    >
       <div className={styles.menuIcon} onClick={toggleMenu}>
        <Image src={threelines} alt="menu" width={30} height={30} />
      </div>
      <div className={styles.logo}>
        <Image
          src={image}
          alt="pic"
          style={{ width: "100%", height: "80px" }}
        />
      </div>
      <div className={styles.navbar}>
        <div
          className={styles.upper}
          style={{ display: "flex", marginLeft: "30px" }}
        >
          <div className={styles.upper}>
            <a
              href="https://www.facebook.com/woxnpackagingsolution/"
              target="_blank"
              style={{ marginLeft: "30%", width: "3%" }}
            >
              <Image
                src={fb}
                style={{
                  height: "25px",
                  width: "100%",
                  marginTop: "7px",
                  // marginLeft: "40%",
                }}
                alt="pic"
              />
            </a>
            <a
              href="https://www.instagram.com/woxnpackagingsolution/"
              target="_blank"
              style={{ marginLeft: "7px", width: "3%" }}
            >
              <Image
                src={insta}
                alt="pic"
                style={{
                  height: "27px",
                  width: "100%",
                  marginTop: "7px",
                  // marginLeft: "10px",
                }}
              />
            </a>
            <a
              href="https://www.youtube.com/@woxnpackagingsolution"
              target="_blank"
              style={{ marginLeft: "5px", width: "4%" }}
            >
              <Image
                src={you}
                alt="pic"
                style={{
                  height: "20px",
                  width: "100%",
                  marginTop: "10px",
                  // marginLeft: "4px",
                }}
              />
            </a>

            <a href="mailto:packagingsolutionindia@gmail.com" target="_blank">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  marginTop: "9px",
                  marginLeft: "30px",
                }}
              >
                <Image
                  src={email}
                  alt="email"
                  width={20}
                  style={{ marginRight: "5px" }}
                />
                <p style={{ margin: 0 }}>packagingsolutionindia@gmail.com</p>
              </div>
            </a>

            <a href="tel:+919818293306">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  marginTop: "9px",
                  marginLeft: "30px",
                }}
              >
                <Image
                  src={phone}
                  alt="phone"
                  width={20}
                  style={{ marginRight: "5px" }}
                />
                <p style={{ margin: 0 }}>+91 9818293306</p>
              </div>
            </a>
          </div>
        </div>
        <div className={`${styles.tabs} ${styles.showMenu ? "show-menu" : ""}`}>
          
          <Link href="/">Home</Link>
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setShowAllCategories(true)}
            onMouseLeave={() => setShowAllCategories(false)}
          >
            <div
              className={styles.dropdownToggle}
              onClick={toggleShowAllCategories}
            >
              <Link href="/allCategories">Product</Link>
            </div>
            {showAllCategories && renderCategoriesDropdown()}
          </div>
          <Link href="/videos"> Videos</Link>
          <Link href="/about">About</Link>
          <Link href="/contactus">Contact Us</Link>
          <div className={styles.pictures}>
            <Image
              src={Gem}
              alt="pic"
              style={{ width: "100%", height: "80px" }}
            />
            <Image
              src={ISO}
              alt="pic"
              style={{ width: "100%", height: "80px" }}
            />
            <div className={styles.underline}></div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
