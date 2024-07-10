import React from 'react';

const CategorySlider = ({ data }) => {
  return (
    <div className="flex flex-row gap-6  scroll mb-5">
      {data.map((item) => {
        return (
          <div
            key={item._id}
            className="flex flex-col items-center sm:w-40 sm:h-30"
          >
            <div className="cursor-pointer">
              <img
                src={item.categoryImage}
                alt={item.categoryName}
                className="h-20 w-32 md:w-30 md:h-40"
              />
            </div>
            <h3 className="text-xl mt-1 text-gray-700">{item.categoryName}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySlider;
