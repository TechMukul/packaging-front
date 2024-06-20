import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

const Content = () => {
  const [visibleElements, setVisibleElements] = useState<any>({});
  const paraRef = useRef<any>(null);
  const columnsRef = useRef<any>([null, null, null]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-id");
          if (id) {
            setVisibleElements((prev) => ({
              ...prev,
              [id]: true,
            }));
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (paraRef.current) {
      paraRef.current.setAttribute("data-id", "para");
      observer.observe(paraRef.current);
    }

    columnsRef.current.forEach((col, index) => {
      if (col) {
        col.setAttribute("data-id", `column-${index}`);
        observer.observe(col);
      }
    });

    return () => {
      if (paraRef.current) observer.unobserve(paraRef.current);
      columnsRef.current.forEach((col) => {
        if (col) observer.unobserve(col);
      });
    };
  }, []);

  const handleColumnRef = (el, index) => {
    columnsRef.current[index] = el;
  };

  return (
    <div className={styles.container}>
      <div style={{backgroundColor:"#0056b3",width:"100%",borderRadius:"10px",height:"110px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <h1 style={{color:"white",fontFamily:""}} className={styles.head}>
          MANUFACTURER, SUPPLIER & EXPORTER OF FRUIT & VEGETABLE <br />PROCESSING & PACKAGING MACHINES 
        </h1>
      </div>
      <p
        ref={paraRef}
        data-id="para-2"
        className={`${styles.para} ${
          visibleElements["para"] ? styles["para-visible"] : ""
        }`}
      ></p>
      <div
        ref={paraRef}
        className={`${styles.para} ${
          visibleElements["para"] ? styles["para-visible"] : ""
        }`}
      >
        <Image
          src={"https://cdn.firstcry.com/education/2022/03/21114052/1265601385.jpg"}
          alt="pic"
          width={500}
          height={290}
          className={styles.images}
        />
        <div>
          <p className={styles.cont}>
            Our company specializes in the manufacturing of machines for fruit
            and vegetable processing and packaging machines. We design and
            produce a wide range of equipment tailored to the needs of food
            processing industries, ensuring efficiency and quality in every step
            of the production process. Our machines are crafted with precision
            and innovation, aimed at enhancing productivity while maintaining
            the freshness and integrity of fruits and vegetables. With a
            commitment to technological advancement and customer satisfaction,
            we strive to be a trusted partner in the food processing industry
            worldwide.
          </p>
          <p className={styles.cont} style={{ marginTop: "10px" }}>
            Worldwide, significant spoilage and loss of fruits and vegetables
            occur due to insufficient knowledge about processing techniques.
            Farmers and producers may lack access to information on proper
            harvesting, storage, and processing methods. As a result, produce
            can spoil quickly, especially in regions with inadequate
            infrastructure for Fruit & Vegetables Processing / Cold storage and
            transportation. In terms of specific quantities of fruits and
            vegetables lost annually and FAO estimates that globally, around to  45% of fruits and vegetables 
          </p>
        </div>
      </div>
      <p style={{}} className={styles.cont}>
        produced are lost or
        wasted. These losses highlight the need for improved infrastructure,
        better handling practices, and increased awareness about efficient
        processing and preservation methods to reduce food waste and improve
        food security globally.
      </p>
      <h2 className={styles["main-heading"]}>Our product range includes:</h2>
      <div className={styles.columnsContainer}>
        <div
          ref={(el) => handleColumnRef(el, 0)}
          className={`${styles.column} ${
            visibleElements["column-0"] ? styles["column-visible"] : ""
          }`}
          data-id="column-0"
        >
          <ul>
            <li>Washing/Sorting/Grading Line</li>
            <li>Fruit & Veg. Processing Unit</li>
            <li>Tomato Processing Unit</li>
            <li>Fruit Jam Processing Unit</li>
          </ul>
        </div>
        <div
          ref={(el) => handleColumnRef(el, 1)}
          className={`${styles.column} ${
            visibleElements["column-1"] ? styles["column-visible"] : ""
          }`}
          data-id="column-1"
        >
          <ul>
            <li>Mayonnaise Processing Unit</li>
            <li>Fruit Juice Processing Unit</li>
            <li>Fruit & Veg. Dehydration Unit</li>
            <li>Spice Processing Unit</li>
          </ul>
        </div>
        <div
          ref={(el) => handleColumnRef(el, 2)}
          className={`${styles.column} ${
            visibleElements["column-2"] ? styles["column-visible"] : ""
          }`}
          data-id="column-2"
        >
          <ul>
            <li>Fruit & Vegetable Pulp Unit</li>
            <li>Pickle Processing Unit</li>
            <li>Ginger & Garlic Paste Unit</li>
            <li>Commercial Vegetables Cutter</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Content;
