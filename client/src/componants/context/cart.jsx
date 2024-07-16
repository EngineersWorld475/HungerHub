import { createContext, useContext, useEffect, useState } from 'react';

const cartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let existingItem = localStorage.getItem('hungcart');
    if (existingItem) setCart(JSON.parse(existingItem));
  }, []);

  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => useContext(cartContext);
export { useCart, CartProvider };
