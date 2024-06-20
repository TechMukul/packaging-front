import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const linesData = [
  {
    title: 'Tomato Ketchup Plant',
    lines: [
      'Efficient production of tangy ketchup.',
      'Processing ripe tomatoes into condiments.',
      'Automated ketchup manufacturing facility.'
    ]
  },
  {
    title: 'Fruit Juice Plant',
    lines: [
      'Extracting Juice from fresh Fruits.',
      'High-capacity Fruit Juice operation.',
      'Supplying Fruit Juice for processing.'
    ]
  },
  {
    title: 'Tin Can Packaging line',
    lines: [
      'Efficiently producing premium tomato puree.',
      'Leveraging advanced pureeing and packaging technology.',
      'Delivering high-quality puree from production to packaging.'
    ]
  },
  {
    title: 'Fruit & Vegetable dehydration',
    lines: [
      'Maintains essential nutrients and extends shelf life.',
      'Easier and cheaper to transport and store.',
      'Intensifies flavors for diverse culinary uses.'
    ]
  }
];

const Carousel = ({ carouselData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, carouselData]);

  const nextSlide = () => {
    if (!carouselData || carouselData.length === 0) return; // Guard clause

    setCurrentIndex((prevIndex) => (prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    if (!carouselData || carouselData.length === 0) return; // Guard clause

    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1));
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  if (!carouselData || carouselData.length === 0) {
    return <div className={styles['loading-text']}>Loading...</div>;
  }

  return (
    <div className={styles['carousel-container']}>
      <button className={`${styles['arrow-button']} ${styles['prev']}`} onClick={prevSlide}>
        &#10094;
      </button>
      <div className={styles['carousel-slide']}>
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`${styles['carousel-item']} ${index === currentIndex ? `${styles['active']} ${styles['animate-pop']}` : ''}`}
          >
            <div className={styles['image-container']}>
              <Image
                src={item.image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={`${styles['text-overlay']} ${index === currentIndex ? styles['animate-pop'] : ''}`}>
              <div className={styles['text-container']}>
                <h2 className={`${styles['title']} ${index === currentIndex ? styles['animate-pop'] : ''}`}>{linesData[index].title}</h2>
                <ul className={styles['lines-list']}>
                  {linesData[index].lines.map((line, idx) => (
                    <li key={idx} className={`${styles['line']} ${index === currentIndex ? styles['animate-pop'] : ''}`}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className={`${styles['arrow-button']} ${styles['next']}`} onClick={nextSlide}>
        &#10095;
      </button>
      <div className={styles['indicators']}>
        {carouselData.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? styles['active'] : ''}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
