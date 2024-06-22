// next.config.mjs
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com', 
      'woxnpackaging.appspot.com', 
      'firebasestorage.googleapis.com',
      'png.pngtree.com',
      'www.outdoorguide.com',
      'www.theenglishgarden.co.uk',
      'fruitgrowers.com',
      // 'www.croptracker.com',
      'cdn-icons-png.flaticon.com',
      'images.squarespace-cdn.com',
      'red-leaf.vercel.app',
      'upload.wikimedia.org',
      'photomarks.app',
      'encrypted-tbn0.gstatic.com',
      'mir-s3-cdn-cf.behance.net',
      'www.google.com',
      'i.pinimg.com',
      'www.biia.com',
      'media-cdn.tripadvisor.com',
      'lh3.googleusercontent.com',
      'static.vecteezy.com',
      'knnindia.co.in',
      'www.cannedfood.co.uk',
      'assets.epicurious.com',
      'cdn.firstcry.com',
      'www.peakxv.com',
      'as1.ftcdn.net',
      'cdn.imgbin.com',
      't4.ftcdn.net',
      'www.nextvisual.com.my',
      'www.joseloffgallery.org',
      '5.imimg.com'
    ],
  },
  
};

export default nextConfig;
