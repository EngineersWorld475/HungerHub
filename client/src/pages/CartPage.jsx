import React, { useEffect, useState } from 'react';
import { useCart } from '../componants/context/cart';
import { Select, Table, TableRow } from 'flowbite-react';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  //handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    console.log('updated', updatedCart);
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
          </div>
        ) : (
          <p className=" mt-5 text-center">You have no items in cart</p>
        )}
      </>
    </div>
  );
};

export default CartPage;
