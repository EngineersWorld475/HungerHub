import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CategorySlider from '../componants/CategorySlider';
import TopDishes from '../componants/TopDishes';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const getCategories = async () => {
    try {
      const res = await fetch(`/api/v4/category/get-categories`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFoodItems = async () => {
    try {
      const res = await fetch(`/api/v4/food/get-food`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setFoodItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getFoodItems();
  }, []);
  console.log(foodItems);
  return (
    <>
      <div className="px-5">
        <div className="relative">
          <img
            src={assets.header_img}
            alt="Header Image"
            className="object-cover w-full h-64 sm:h-full sm:p-7"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl sm:text-6xl font-bold">
                Order your favorite food here
              </h1>
              <p className="mt-4 text-lg sm:text-xl max-w-md mx-auto sm:font-semibold">
                Choose from a diverse menu featuring a delectable array of
                dishes
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-10 px-5">
          <h1 className="text-3xl font-semibold text-gray-700 mb-4">
            Explore our menu
          </h1>
          <p className="text-gray-500 sm:text-xl font-serif">
            Discover a tantalizing array of dishes tailored to satisfy every
            craving. Explore our menu and indulge in flavors that bring the
            restaurant experience to your doorstep.
          </p>
          <p className="text-gray-500 sm:text-xl font-serif">
            our carefully curated selection ensures there's something to
            tantalize every palate.
          </p>
        </div>
        <div className="overflow-x-scroll">
          <CategorySlider data={categories} />
        </div>
        <hr className="my-10 mb-5 border-b-2 border-gray-400" />
      </div>
      <div className="p-5">
        <TopDishes data={foodItems} />
      </div>
    </>
  );
};

export default Home;
