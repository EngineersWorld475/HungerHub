import React, { useEffect, useState } from 'react';
import { useCart } from '../componants/context/cart';
import { Select, Table, TableRow } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { existingUser } = useSelector((state) => state.hunguser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const foodItems = cart.map((c) => c._id);

  //handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  // handle remove item
  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.forEach((food) => {
        total += food.price * food.quantity;
      });
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);
  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Toggle modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle input change for payment details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const orderCreate = async () => {
    try {
      const res = await fetch(`/api/v4/order/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodItems,
          buyer: existingUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/dashboard?tab=orders');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('.................', foodItems);
  return (
    <div className="min-h-screen min-w-3xl p-3 md:mx-auto">
      <>
        {cart && cart.length > 0 ? (
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
            <Table className="my-5">
              <Table.Head>
                <Table.HeadCell>Item</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Quantity
                </Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              {cart.map((food, index) => {
                return (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <div className="md:flex flex-row gap-2">
                          <img
                            src={food && food.foodImage}
                            alt="food-image"
                            className="w-30 h-20 object-cover bg-gray-500"
                          />
                          <div className="flex flex-col gap-3">
                            <h1 className="md:text-xl text-red-500 font-semibold">
                              {food.foodName}
                            </h1>
                            <h1 className="text-semibold text-gray-700">
                              [{food.restaurant}]
                            </h1>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="md:text-xl text-red-500 font-semibold">
                        &#8377;{food.price}
                      </Table.Cell>
                      <Table.Cell>
                        <Select
                          defaultValue={food.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          className="px-3 py-2 rounded-md bg-red-500 text-white"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
            </Table>
            <p className="py-5  md:text-xl text-red-500 font-semibold">
              Total Price: &#8377;{totalPrice}
            </p>
            <div>
              <Select
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
                style={{
                  width: '150px',
                  fontSize: '0.875rem',
                  padding: '0.25rem 0.5rem',
                }}
                className="mr-3"
                disabled={!existingUser}
              >
                <option value="">Select Payment Method</option>
                <option value="creditcard">Credit Card</option>
                <option value="paypal">PayPal</option>
              </Select>
              <button
                className="px-4 py-2 my-3 rounded-md bg-green-500 text-white disabled:opacity-50"
                onClick={toggleModal}
                disabled={!selectedPaymentMethod || !existingUser}
              >
                Pay Now
              </button>
            </div>
          </div>
        ) : (
          <p className=" mt-5 text-center">You have no items in cart</p>
        )}
        {/* Modal for entering payment details */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Enter Payment Details
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={orderCreate}
                    disabled={
                      !paymentDetails.cardNumber ||
                      !paymentDetails.expiryDate ||
                      !paymentDetails.cvv
                    }
                  >
                    Submit Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CartPage;
