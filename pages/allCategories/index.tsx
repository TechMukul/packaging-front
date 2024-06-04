import React from 'react';
import styles from './index.module.scss'; // Import your SCSS module for styling
import Image from 'next/image';
import Navbar from '../../component/Navbar/Navbar';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  photo: string;
  permaLink: string;
  createdAt: string;
  updatedAt: string;
}

interface IndexProps {
  Categories: Category[];
}

const Index: React.FC<IndexProps> = ({ Categories }) => {

  return (
    <>
    {/* <Navbar Categories={Categories}/> */}
    <div className={styles.container}>
      <h2 className={styles.heading}>All Categories</h2>
      <div className={styles.categoryList}>
        {Categories.map((category) => (
          <div className={styles.categoryCard} key={category._id}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{category.name}</h3>
              <div className={styles.imageContainer}>
                <Link href={`/category/${category.permaLink}`} >
                <Image
                  src={category.photo}
                  alt={`${category.name} photo`}
                  width={200} // Set a fixed width for uniform image sizes
                  height={200} // Set a fixed height for uniform image sizes
                  className={styles.categoryImage}
                />
                </Link>
              </div>
              
              {/* <p className={styles.metaData}><strong>PermaLink:</strong> {category.permaLink}</p> */}
              {/* <p className={styles.metaData}><strong>Created At:</strong> {category.createdAt}</p> */}
              {/* <p className={styles.metaData}><strong>Updated At:</strong> {category.updatedAt}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Index;

export async function getServerSideProps() {
  try {
    const response = await fetch(
      "http://localhost:3000/carousels/all-carousel"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch carousel data. Status: ${response.status}`);
    }

    const carouselData = await response.json();

    const categoriesResponse = await fetch("http://localhost:3000/data/all-category");

    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories data. Status: ${categoriesResponse.status}`);
    }

    const Categories = await categoriesResponse.json();

    return {
      props: {
        carouselData,
        Categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        carouselData: null,
        Categories: null,
      },
    };
  }
}
