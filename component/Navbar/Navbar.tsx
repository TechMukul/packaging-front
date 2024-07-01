import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.scss";
import logo from "../../public/image/WhatsApp Image 2024-05-21 at 7.46.54 AM.svg";
import threelines from "../../public/image/three lines.svg";

const Navbar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [url] = useState("https://www.api.woxnpackagingsolution.com/");
  const [showMenu, setShowMenu] = useState<any>(false);
  const [showAllCategories, setShowAllCategories] = useState<any>(false);
  const [scrollDirection, setScrollDirection] = useState<any>("up");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

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

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filteredSuggestions = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, categories]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchItemClick = (category: any) => {
    setSearchTerm("");
    // console.log(`Selected category: ${category.name}`);
    // Additional actions on item click (e.g., navigate to category page)
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <div className={styles.searchSuggestions}>
        {suggestions.map((category) => (
          <div
            key={category._id}
            className={styles.suggestion}
            onClick={() => handleSearchItemClick(category)}
          >
            <Link key={category._id} href={`/category/${category.permaLink}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const renderCategoriesDropdown = () => {
    return (
      <div className={styles.dropdown}>
        {categories.slice(0, 8).map((category) => (
          <Link key={category._id} href={`/category/${category.permaLink}`}>
            {category.name}
          </Link>
        ))}
        <Link href="/allCategories">
          <button className={styles.viewAllBtn}>View all</button>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`${styles.navbar} ${
        scrollDirection === "down" ? styles.scrolledDown : styles.scrolledUp
      }`}
    >
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.menuIcon} onClick={toggleMenu}>
            <Image src={threelines} alt="menu" width={30} height={30} />
          </div>
          <Link href={"/"}>
            <Image src={logo} alt="logo" className={styles.logo} />
          </Link>
        </div>
        <div className={`${styles.tabs} ${showMenu ? styles.showMenu : ""}`}>
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
              <span className={styles.dropdownArrow}>▼</span>
            </div>
            {showAllCategories && renderCategoriesDropdown()}
          </div>
          <Link href="/videos">Videos</Link>
          <Link href="/about">About</Link>
          <Link href="/contactus">Contact Us</Link>
          <div className={styles.searchContainer}>
            
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                // style={{ backgroundColor: "#0056b3" }}
              />
              {renderSuggestions()}
              <FontAwesomeIcon
               height={20}
               width={20}
                icon={faSearch}
                style={{position:"absolute", left:"280"}}
                // className={styles.searchIcon}
                // style={{ backgroundColor: "#0056b3", marginLeft: "0" }}
               
              />
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
