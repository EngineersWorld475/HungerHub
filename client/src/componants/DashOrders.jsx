import { Modal, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { existingUser } = useSelector((state) => state.hunguser);
  const [selected, setSelected] = useState('');
  const [orderId, setOrderId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const getAllOrders = async () => {
    try {
      const res = await fetch(`/api/v4/order/get-orders`);
      const data = await res.json();
      if (res.ok) {
        setAllOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async () => {
    setOpenEditModal(false);
    try {
      const res = await fetch(`/api/v4/order/update-order/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: selected,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update order');
      }
      const data = await res.json();

      toast.success('Order updated successfully');
      getAllOrders();
    } catch (error) {
      toast.error('Failed to update order. Please try again later');
    }
  };

  const deleteOrder = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(`/api/v4/order/delete-order/${orderId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        getAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (existingUser.isAdmin) {
      getAllOrders();
    }
  }, [existingUser]);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {allOrders && allOrders.length > 0 ? (
          <div className="mt-8">
            <h1 className="text-3xl font-semibold text-center text-red-600 mb-8">
              All Orders List
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow overflow-hidden sm:rounded-lg mb-6"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Order ID: {order._id}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Created at:{' '}
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      User Name: {order.buyer.username}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Status: {order.status}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {order.foodItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={item.foodImage}
                            alt={item.foodName}
                            className="w-16 h-16 rounded-lg"
                          />
                          <div>
                            <p className="text-base font-semibold text-gray-800">
                              {item.foodName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.restaurant}
                            </p>
                            <p className="text-sm text-red-600">
                              &#8377;{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 flex justify-end">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                      onClick={() => {
                        setOpenEditModal(true);
                        setOrderId(order._id);
                      }}
                    >
                      Update Order
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => {
                        setOpenModal(true);
                        setOrderId(order._id);
                      }}
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center mt-8">
            <h1 className="text-3xl font-semibold text-red-600 mb-8">
              No Orders Available
            </h1>
          </div>
        )}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col gap-3 items-center">
            <p className="text-2xl text-gray-600 mb-2">
              Are you sure you want to delete this order?
            </p>
            <div className="flex flex-row gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={deleteOrder}
              >
                Yes, I'm Sure
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl text-gray-600 font-semibold mb-4">
              Update Delivery Status
            </h1>
            <Select
              style={{ width: '200px', padding: '8px' }}
              onChange={(e) => setSelected(e.target.value)}
              value={selected}
            >
              <option value="Not Processed">Not Processed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="On the Way">On the Way</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            <button
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={updateOrder}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashOrders;
