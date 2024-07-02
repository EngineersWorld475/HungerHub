import React from 'react';
import { assets } from '../assets/assets';

const Home = () => {
  return (
    <div className="relative ">
      <img
        src={assets.header_img}
        alt="Header Image"
        className="object-cover w-full h-64 sm:h-full p-3 sm:p-7"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl sm:text-6xl font-bold">
            Order your favorite food here
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-md mx-auto sm:font-semibold">
            Choose from a diverse menu featuring a delectable array of dishes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
//
