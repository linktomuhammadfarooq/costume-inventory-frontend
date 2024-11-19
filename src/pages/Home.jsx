import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/background.jpeg';

const Home = () => {
  return (
    <>
     <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <div className="flex items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Welcome to My Events</h1>
      </div>
    </div>
    <Footer />
    </>
   
  );
};

export default Home;
