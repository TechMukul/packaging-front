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
      'firebasestorage.googleapis.com'
    ],
  },
  
};

export default nextConfig;
