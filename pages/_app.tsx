import React from 'react';
import App from 'next/app';
import Footer from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";
// import '../styles/globals.scss'; // Adjust the path accordingly
import dotenv from 'dotenv';

dotenv.config();
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        {/* <Navbar Categories={pageProps.Categories} /> */}
        <Component {...pageProps} />
        <Footer />
      </div>
    );
  }
}

export default MyApp;
