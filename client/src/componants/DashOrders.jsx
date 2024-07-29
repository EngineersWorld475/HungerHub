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
        setAllOrders(data);
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

      toast('Order updated successfully');
      getAllOrders();
    } catch (error) {
      toast('Failed to update order. please try again later');
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
        toast(data.message);
      } else {
        toast(data.message);
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
  console.log('.....orderId', orderId);
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen mx-auto">
        {allOrders && allOrders.length > 0 ? (
          <>
            <h1 className="text-center my-5 text-xl font-sans text-red-600">
              All orders list
            </h1>
            {allOrders.map((order) => (
              <>
                <div
                  key={order._id}
                  className="flex flex-wrap gap-10 mx-3 py-5 border border-green-500 p-2 mb-3"
                >
                  <div className="flex flex-col">
                    <p className="text-center border border-yellow-300 p-1 rounded-2xl text-xs">
                      Created at
                    </p>
                    <h1 className="my-5">
                      {new Date(order && order.updatedAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center border border-yellow-300 p-1 rounded-2xl text-xs">
                      user name
                    </p>
                    <h1 className="my-5">{order.buyer.username}</h1>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center border border-yellow-300 p-1 rounded-2xl text-xs">
                      Status
                    </p>
                    <h1 className="my-5">{order.status}</h1>
                  </div>
                  {order.foodItems.map((item, index) => (
                    <>
                      <div key={item._id} className="flex flex-col">
                        <p className="text-center border border-yellow-300 p-1 rounded-2xl text-xs">
                          food image
                        </p>
                        <img
                          src={item.foodImage}
                          className="w-14 h-14 bg-gray-500 rounded-full my-2"
                          alt="foodImage"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-center border border-yellow-300 p-1 rounded-2xl text-xs">
                          food Name
                        </p>
                        <h1 className="my-5">{item.foodName}</h1>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-center border border-yellow-300 p-1 rounded-2xl text-xs">
                          Restaurant
                        </p>
                        <h1 className="my-5">{item.restaurant}</h1>
                      </div>
                    </>
                  ))}
                </div>
                <button
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white mb-2 mx-3"
                  onClick={() => {
                    setOpenEditModal(true);
                    setOrderId(order._id);
                  }}
                >
                  Update order
                </button>
                <button
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white mb-2 mx-2"
                  onClick={() => {
                    setOpenModal(true);
                    setOrderId(order._id);
                  }}
                >
                  Delete order
                </button>
              </>
            ))}
          </>
        ) : (
          <h1 className="text-center my-5 text-xl font-sans text-red-600">
            No orders are available
          </h1>
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
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-24"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md "
                onClick={deleteOrder}
              >
                Yes i'm sure
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl text-gray-500 font-sans mb-5">
              Update delivery status
            </h1>
            <Select
              style={{
                width: '150px',
                fontSize: '0.875rem',
                padding: '0.25rem 0.5rem',
                marginTop: '5px',
              }}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value={'Not process'}>Not process</option>
              <option value={'Confirmed'}>Confirmed</option>
              <option value={'Preparing'}>Preparing</option>
              <option value={'Ready for pickup'}>Ready for pickup</option>
              <option value={'On the way'}>On the way</option>
              <option value={'Delivered'}>Delivered</option>
              <option value={'Cancelled'}>Cancelled</option>
            </Select>
            <button
              className="px-2 py-1 my-5 bg-blue-500 hover:bg-blue-600 text-white rounded-md "
              onClick={updateOrder}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashOrders;
