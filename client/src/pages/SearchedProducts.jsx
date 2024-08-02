import React from 'react';
import { useSearch } from '../componants/context/Search';
import TopDishes from '../componants/TopDishes';

const SearchedProducts = () => {
  const [value, setValue] = useSearch();
  return (
    <div className="max-h-screen mx-auto">
      {value.result.length > 0 ? (
        <>
          <p className="my-5 text-center text-xl">
            found {value.result.length} items
          </p>
          <div className="p-10">
            <TopDishes data={value.result} />
          </div>
        </>
      ) : (
        <p className="my-5 text-center text-xl">Found 0 items</p>
      )}
    </div>
  );
};

export default SearchedProducts;
