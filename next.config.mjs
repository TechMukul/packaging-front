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
  env: {
    NEXT_PUBLIC_APIVAL: process.env.NEXT_PUBLIC_APIVAL,
  },
};

export default nextConfig;
