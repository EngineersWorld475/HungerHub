import React, { useEffect, useState } from 'react';
import { useSearch } from '../componants/context/Search';
import TopDishes from '../componants/TopDishes';
import { Select } from 'flowbite-react';
import { Prices } from '../componants/Prices';

const SearchedProducts = () => {
  const [value, setValue] = useSearch();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedPrices, setSelectedPrices] = useState([]);
  console.log(category);
  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const pricesArr = selectedPrices
        .split(',')
        .map((num) => parseInt(num, 10));
      const res = await fetch(`/api/v4/food/filter-food-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: pricesArr,
          category,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setValue({
          ...value,
          result: data,
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`/api/v4/category/get-categories`);
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen mx-auto">
      <div className="p-10">
        <h1 className="text-center text-xl text-gray-600 mb-5">
          Refine Your Search
        </h1>
        <form onSubmit={handleFilter}>
          <div className="flex flex-col md:flex-row gap-3 items-center mb-5">
            <h1 className="font-semibold text-sm">Category:</h1>
            <Select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Uncategorized</option>
              {categories.map((cat) => {
                return (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="flex flex-col gap-3 md:items-start mb-5">
            <h1 className="font-semibold text-sm bg-gray-700 p-2 text-white">
              Filter by Price
            </h1>
            {Prices.map((p) => (
              <label key={p.name}>
                <input
                  type="radio"
                  name="fruit"
                  value={p.array}
                  onChange={(e) => setSelectedPrices(e.target.value)}
                />{' '}
                &#8377; {p.name}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="px-1 py-1 bg-orange-400 w-full text-white hover:bg-orange-500 font-semibold"
          >
            Apply filter
          </button>
        </form>
      </div>
      {value.result.length > 0 ? (
        <div className="w-full">
          <p className="my-5 text-center text-xl">
            found {value.result.length} items
          </p>
          <div className="p-10">
            <TopDishes data={value.result} />
          </div>
        </div>
      ) : (
        <h1 className="my-5 text-center text-xl">Found 0 items</h1>
      )}
    </div>
  );
};

export default SearchedProducts;
