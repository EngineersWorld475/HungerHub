import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold mb-2">Foodie</h1>
            <p className="text-gray-400">
              Delivering the best food to your doorstep. Fresh and fast, just
              the way you like it.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-orange-500">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <ul className="space-y-2">
              <li>
                <p>123 Food Street, Gourmet City</p>
              </li>
              <li>
                <p>Email: support@foodie.com</p>
              </li>
              <li>
                <p>Phone: (123) 456-7890</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" rel="noopener noreferrer">
            <FaFacebook className="text-2xl hover:text-orange-500" />
          </a>
          <a href="#" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-orange-500" />
          </a>
          <a href="#" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-orange-500" />
          </a>
          <a href="#" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-orange-500" />
          </a>
        </div>

        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Foodie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
