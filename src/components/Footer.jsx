import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">My Events</h2>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              About Us
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Services
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} My Events. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
