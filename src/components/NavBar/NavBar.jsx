import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`hidden md:flex space-x-6 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link to="/home" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <a href="#" className="text-gray-300 hover:text-white">
            Meme Generate
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            About Us
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Contact
          </a>
        </div>
      </div>
   
      {isOpen && (
        <div className="md:hidden mt-2 py-4 bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
          <a
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition duration-150"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition duration-150"
          >
            Meme Generate
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition duration-150"
          >
            About Us
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded transition duration-150"
          >
            Contact
          </a>
        </div>
      )}
    </nav> */}
    </div>
  );
};

export default Navbar;
