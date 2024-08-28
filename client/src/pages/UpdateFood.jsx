import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateFood = () => {
  const [foodItem, setFoodItem] = useState({
    restaurant: '',
    category: '',
    foodName: '',
    price: '',
    quantity: '',
  });
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();

  const getFoodItem = async () => {
    try {
      const res = await fetch(`/api/v4/food/get-food/${slug}`);
      const data = await res.json();
      if (res.ok) {
        setFoodItem(data[0]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`/api/v4/category/get-categories`);
      const data = await res.json();
      if (res.ok) {
        setCategories(data.categories);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (slug) {
      getFoodItem();
    }
  }, [slug]);

  useEffect(() => {
    getCategories();
  }, []);
  console.log(foodItem);
  const handleChange = (e) => {
    setFoodItem({ ...foodItem, [e.target.id]: e.target.value });
  };

  return (
    <div className="max-w-3xl min-h-screen mx-auto p-3">
      <h1 className="text-2xl text-gray-800 font-semibold text-center my-5">
        Update Food Item
      </h1>
      <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/2 md:mr-4">
            <label
              htmlFor="restaurant"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Restaurant
            </label>
            <TextInput
              id="restaurant"
              name="restaurant"
              type="text"
              value={foodItem && foodItem.restaurant}
              placeholder="Enter restaurant"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category
            </label>
            <Select
              id="category"
              name="category"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">
                {foodItem && foodItem.category.categoryName}
              </option>
              {categories &&
                categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  );
                })}
            </Select>
          </div>
        </div>
        <div className="md:w-full mb-4">
          <label
            htmlFor="foodName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Food name
          </label>
          <TextInput
            id="foodName"
            name="foodName"
            type="text"
            value={foodItem.foodName}
            placeholder="Enter food name"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="p-7 border border-teal-500 items-center flex flex-col md:flex-row gap-4 justify-between mb-4">
          <FileInput type="file" accept="image/*" />
          <Button gradientDuoTone={'purpleToBlue'}>Upload image</Button>
        </div>
        {foodItem && foodItem.foodImage && (
          <img
            src={foodItem.foodImage}
            alt={'image'}
            className="h-60 object-cover w-full mb-4"
          />
        )}
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="w-full">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Food price
            </label>
            <TextInput
              id="price"
              name="price"
              type="text"
              value={foodItem.price}
              placeholder="Enter food price"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="quantity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              quantity
            </label>
            <Select
              id="quantity"
              name="quantity"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">{foodItem.quantity}</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Food Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFood;
