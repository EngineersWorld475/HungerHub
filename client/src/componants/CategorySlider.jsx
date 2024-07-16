import React from 'react';
import { Link } from 'react-router-dom';

const CategorySlider = ({ data }) => {
  return (
    <div className="flex flex-row gap-7 md:gap-5 scroll mb-5">
      {data.map((item) => {
        return (
          <div
            key={item._id}
            className="flex flex-col items-center sm:w-40 sm:h-30"
          >
            <div className="cursor-pointer">
              <Link to={`category-page/${item._id}`}>
                <img
                  src={item.categoryImage}
                  alt={item.categoryName}
                  className="w-24 h-20 md:w-32 md:h-32 rounded-full md:hover:border md:border-4 border-orange-500 p-3"
                />
              </Link>
            </div>
            <h3 className="text-xl mt-1 text-gray-700">{item.categoryName}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySlider;
