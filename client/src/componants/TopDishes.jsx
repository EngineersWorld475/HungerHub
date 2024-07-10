import React from 'react';
import { Link } from 'react-router-dom';
Link;
const TopDishes = ({ data }) => {
  return (
    <>
      <h3 className="text-2xl  text-gray-800 font-semibold mb-5">
        Top dishes near you
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {data.map((item) => {
          return (
            <div
              key={item.slug}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to="#">
                <img
                  className="rounded-t-lg"
                  src={item.foodImage}
                  alt={item.slug}
                />
              </Link>
              <div className="p-5">
                <Link to="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500 dark:text-white">
                    {item.restaurant}
                  </h5>
                </Link>
                <Link to="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500 dark:text-white">
                    {item.foodName}
                  </h5>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TopDishes;
