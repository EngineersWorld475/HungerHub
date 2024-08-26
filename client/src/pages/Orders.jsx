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

  return (
    <div className="min-h-screen  py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-red-500 mb-8">
        Order History and Status
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-green-700 mb-2">
                Order ID: {order._id}
              </h2>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <div className="mt-4 space-y-2">
                {order.foodItems.map((foodItem) => (
                  <div
                    key={foodItem._id}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={foodItem.foodImage}
                      alt={foodItem.foodName}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {foodItem.foodName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {foodItem.restaurant}
                      </p>
                      <p className="text-sm text-red-600">
                        &#8377;{foodItem.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
