import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopDishes from '../componants/TopDishes';

const ItemsByCategory = () => {
  const [items, setItems] = useState([]);
  const params = useParams();

  const getItems = async () => {
    try {
      const res = await fetch(`/api/v4/food/get-food-by-category/${params.id}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="max-h-screen p-5 mx-auto">
      {items.length > 0 ? (
        <>
          <h1 className="text-center text-xl">{items.length} Items found</h1>
          <div className="my-5 mx-10">
            <TopDishes data={items} />
          </div>
        </>
      ) : (
        <h1 className="text-center text-xl">Found 0 items</h1>
      )}
    </div>
  );
};

export default ItemsByCategory;
