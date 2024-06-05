import React, { useEffect, useRef } from 'react';
import Navbar from "../../component/Navbar/Navbar";
import styles from './video.module.scss';
import Head from 'next/head';

interface VideoComponentProps {
  Categories: any; // Replace `any` with the actual type if known
}

const VideoComponent: React.FC<VideoComponentProps> = ({ Categories }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);

  useEffect(() => {
    // Load YouTube API script dynamically
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      console.error('Failed to find the first script tag or its parent node.');
    }

    // YouTube API ready function
    (window as any).onYouTubeIframeAPIReady = () => {
      player.current = new (window as any).YT.Player(playerRef.current, {
        videoId: '8nRgR4WOnu8',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
      });
    };

    return () => {
      // Clean up
      if (player.current) {
        player.current.destroy();
      }
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  const handleMouseEnter = () => {
    if (player.current && player.current.playVideo) {
      player.current.playVideo();
    }
  };

  const handleMouseLeave = () => {
    if (player.current && player.current.pauseVideo) {
      player.current.pauseVideo();
    }
  };

  return (
    <>  <Head>
    <title>Our Videos</title>
    <meta name="description" content="We are machines manufacturer" />
    {/* Additional meta tags, stylesheets, etc. */}
  </Head>
      {/* <Navbar Categories={Categories} /> */}
      <div className={styles.container}>
        <h1 style={{ textAlign: "center" }}>Our Productions</h1>
        <div
          className={styles.videoWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={playerRef} className={styles.video}></div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <iframe
          width="400"
          height="315"
          src="https://www.youtube.com/embed/Wvk2hgJRAd8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/0890bIy0Pyg"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default VideoComponent;

export async function getServerSideProps() {
  try {
    const categoriesResponse = await fetch(`${process.env.apival}/data/all-category`);

    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories data. Status: ${categoriesResponse.status}`);
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
