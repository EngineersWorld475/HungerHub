import React, { useEffect, useState } from 'react';
import { useCart } from '../componants/context/cart';
import { Select } from 'flowbite-react';
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

  // Handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  // Handle remove item
  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.removeItem('hungcart');
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
        localStorage.removeItem('hungcart');
        navigate('/dashboard?tab=orders');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <>
        {cart && cart.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart.map((food, index) => (
                <div
                  key={food._id}
                  className="border rounded-lg p-4 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={food.foodImage}
                      alt="food-image"
                      className="w-20 h-20 object-cover bg-gray-500 rounded-md"
                    />
                    <div className="ml-4 flex flex-col">
                      <h1 className="text-lg text-red-500 font-semibold">
                        {food.foodName}
                      </h1>
                      <h2 className="text-gray-700">[{food.restaurant}]</h2>
                    </div>
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    <span className="text-lg text-red-500 font-semibold">
                      &#8377;{food.price}
                    </span>
                    <Select
                      defaultValue={food.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                      className="w-20"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <button
                    className="self-end px-3 py-2 rounded-md bg-red-500 text-white"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-start md:flex-row md:items-center md:justify-between">
              <p className="text-lg text-red-500 font-semibold mb-4 md:mb-0">
                Total Price: &#8377;{totalPrice}
              </p>
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
                <Select
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="mb-4 md:mb-0"
                  style={{ width: '150px' }}
                  disabled={!existingUser}
                >
                  <option value="">Select Payment Method</option>
                  <option value="creditcard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </Select>
                <button
                  className="px-4 py-2 rounded-md bg-green-500 text-white disabled:opacity-50"
                  onClick={toggleModal}
                  disabled={!selectedPaymentMethod || !existingUser}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-5 text-center">You have no items in cart</p>
        )}
        {/* Modal for entering payment details */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
