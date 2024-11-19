import React from "react";
import backgroundImage from "../assets/background.jpeg";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div
        className="h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header />
        <div className="flex items-center justify-center h-full text-white">
          <h1 className="text-5xl font-bold">Welcome to CIP</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
