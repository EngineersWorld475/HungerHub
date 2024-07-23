import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Orders = () => {
  const { existingUser } = useSelector((state) => state.hunguser);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/v4/order/get-orders/${existingUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [existingUser]);
  console.log(orders);
  return (
    <>
      <div className="min-h-screen px-3 md:px-10">
        <h1 className="text-start text-2xl font-semibold my-5 text-red-500">
          Order History and Status
        </h1>
        <div className="w-auto">
          {orders.map((order) => (
            <div key={order._id}>
              <h1 className="text-green-700 font-semibold mb-1">
                <span className="text-red-500">status:</span> {order.status}
              </h1>
              {order.foodItems.map((foodItem) => (
                <div className="flex flex-col md:flex-row items-center border-4 border-orange-400 p-3 mb-2 w-auto ">
                  <>
                    <img
                      src={foodItem.foodImage}
                      alt={foodItem.foodName}
                      className="w-40 h-40 mb-3"
                    />
                    <h1 className="mx-5 text-xl">{foodItem.foodName}</h1>
                    <h1 className="mx-5 text-xl text-red-400">
                      {foodItem.restaurant}
                    </h1>
                    <h1 className="mx-5 text-xl text-red-600">
                      &#8377;{foodItem.price}
                    </h1>
                  </>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
