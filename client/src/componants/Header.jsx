import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useSearch } from './context/Search';
import { useCart } from './context/cart';

const Header = () => {
  const { existingUser } = useSelector((state) => state.hunguser);
  const [value, setValue] = useSearch();
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [cartCount, setCartCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v4/food/search-foodItem/${value.keyword}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setValue({ ...value, result: data });
        navigate('/searched-products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let totalCount = 0;
    cart &&
      cart.forEach((item) => {
        totalCount += Number(item.quantity);
      });
    setCartCount(totalCount);
  }, [cart]);
  cart.slice(1, 1);
  console.log('cart', cart);
  return (
    <Navbar className="border-b-3 py-5">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 rounded-100 rounded-lg text-white font-bold">
          Hunger
        </span>
        Hub
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
      </form>
      <Button className="w-12 h-10 inline lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        {existingUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={existingUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm text-green-500">
                {existingUser.username}
              </span>
              <span className="block text-sm text-green-500 font-medium truncate">
                {existingUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="pinkToOrange" outline>
              Sign in
            </Button>
          </Link>
        )}

        <div
          className="relative w-12 h-10  px-2 py-1 sm:inline cursor-pointer"
          color="gray"
          style={{ color: '#17B169' }}
        >
          <Link to="/cart-page">
            <FaShoppingCart size={30} />
          </Link>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </div>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/mobile-app'} as={'div'}>
          <Link to="/mobile-app">Mobile-app</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contact-us'} as={'div'}>
          <Link to="/contact-us">Contact us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
