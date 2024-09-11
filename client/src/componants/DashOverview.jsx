import React, { useEffect, useState } from 'react';
import { HiUserGroup, HiDocumentText } from 'react-icons/hi';
import { FaClipboardList, FaComment } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { IoCalendarOutline } from 'react-icons/io5';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashOverview = () => {
  const [users, setUsers] = useState([]);
  const [food, setFood] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUser, setTotalUser] = useState(null);
  const [totalFood, setTotalFood] = useState(null);
  const [totalOrder, setTotalOrder] = useState(null);
  const [totalCategory, setTotalCategory] = useState(null);
  const [totalComment, setTotalComment] = useState(null);
  const [lastMonthUsers, setLastMonthUsers] = useState(null);
  const [lastMonthFood, setLastMonthFood] = useState(null);
  const [lastMonthOrders, setLastMonthOrders] = useState(null);
  const [lastMonthCategories, setLastMonthCategories] = useState(null);
  const [lastMonthComments, setLastMonthComments] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/v4/user/get-users?limit=5`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers(data.users);
        setTotalUser(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/v4/order/get-orders?limit=10`);
      const data = await res.json();
      if (res.ok) {
        setTotalOrder(data.totalOrders);
        setLastMonthOrders(data.lastMonthOrders);
        setOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFood = async () => {
    try {
      const res = await fetch(`/api/v4/food/get-food?limit=5`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setTotalFood(data.totalFoodItems);
        setLastMonthFood(data.lastMonthFoodItems);
        setFood(data.food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/v4/category/get-categories?limit=5`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setTotalCategory(data.totalCategories);
        setLastMonthCategories(data.lastMonthCategories);
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/v4/comment/get-all-comments?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setTotalComment(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
        setComments(data.comments);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchFood();
    fetchCategories();
    fetchComments();
  }, []);

  return (
    <div className="mx-auto min-h-screen px-4">
      <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-5 justify-center">
        <div className="w-full bg-red-500 flex flex-col items-center p-4 rounded-lg shadow-md">
          <h1 className="text-center text-white font-semibold mt-2">
            TOTAL USERS
          </h1>
          <div className="flex flex-row justify-between items-center w-full mt-1">
            <h1 className="text-5xl text-bold text-white">{totalUser}</h1>
            <HiUserGroup className="text-5xl text-white" />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-3 py-1">
            <div className="text-center">
              <p className="text-xs text-white">Last month</p>
              <h1 className="text-3xl text-bold text-white">
                {lastMonthUsers}
              </h1>
            </div>
            <IoCalendarOutline className="text-3xl text-white mt-4" />
          </div>
        </div>
        <div className="w-full bg-green-500 flex flex-col items-center p-4 rounded-lg shadow-md">
          <h1 className="text-center text-white font-semibold mt-2">
            TOTAL FOOD ITEMS
          </h1>
          <div className="flex flex-row justify-between items-center w-full mt-1">
            <h1 className="text-5xl text-bold text-white">{totalFood}</h1>
            <GiKnifeFork className="text-5xl text-white" />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-3 py-1">
            <div className="text-center">
              <p className="text-xs text-white">Last month</p>
              <h1 className="text-3xl text-bold text-white">{lastMonthFood}</h1>
            </div>
            <IoCalendarOutline className="text-3xl text-white mt-4" />
          </div>
        </div>
        <div className="w-full bg-blue-500 flex flex-col items-center p-4 rounded-lg shadow-md">
          <h1 className="text-center text-white font-semibold mt-2">
            TOTAL ORDERS
          </h1>
          <div className="flex flex-row justify-between items-center w-full mt-1">
            <h1 className="text-5xl text-bold text-white">{totalOrder}</h1>
            <FaClipboardList className="text-5xl text-white" />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-3 py-1">
            <div className="text-center">
              <p className="text-xs text-white">Last month</p>
              <h1 className="text-3xl text-bold text-white">
                {lastMonthOrders}
              </h1>
            </div>
            <IoCalendarOutline className="text-3xl text-white mt-4" />
          </div>
        </div>
        <div className="w-full bg-pink-500 flex flex-col items-center p-4 rounded-lg shadow-md">
          <h1 className="text-center text-white font-semibold mt-2">
            TOTAL CATEGORIES
          </h1>
          <div className="flex flex-row justify-between items-center w-full mt-1">
            <h1 className="text-5xl text-bold text-white">{totalCategory}</h1>
            <HiDocumentText className="text-5xl text-white" />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-3 py-1">
            <div className="text-center">
              <p className="text-xs text-white">Last month</p>
              <h1 className="text-3xl text-bold text-white">
                {lastMonthCategories}
              </h1>
            </div>
            <IoCalendarOutline className="text-3xl text-white mt-4" />
          </div>
        </div>
        <div className="w-full bg-gray-500 flex flex-col items-center p-4 rounded-lg shadow-md">
          <h1 className="text-center text-white font-semibold mt-2">
            TOTAL COMMENTS
          </h1>
          <div className="flex flex-row justify-between items-center w-full mt-1">
            <h1 className="text-5xl text-bold text-white">{totalComment}</h1>
            <FaComment className="text-5xl text-white" />
          </div>
          <div className="flex flex-row justify-between items-center w-full px-3 py-1">
            <div className="text-center">
              <p className="text-xs text-white">Last month</p>
              <h1 className="text-3xl text-bold text-white">
                {lastMonthComments}
              </h1>
            </div>
            <IoCalendarOutline className="text-3xl text-white mt-4" />
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="mx-auto mt-3">
          <h1 className="text-center text-semibold text-gray-600 my-2">
            User Overview
          </h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt="user-image"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Link
            to="/dashboard?tab=users"
            className="flex justify-center mt-1 mb-3"
          >
            <button className="bg-transparent outline-none text-blue-500 hover:underline">
              Show all...
            </button>
          </Link>
        </div>
        <div className="mx-auto mt-3">
          <h1 className="text-center text-semibold text-gray-600 my-2">
            Order Overview
          </h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>Order ID</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {orders.map((order) => (
                <Table.Row key={order._id}>
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Link
            to="/dashboard?tab=admin-orders"
            className="flex justify-center mt-1 mb-3"
          >
            <button className="bg-transparent outline-none text-blue-500 hover:underline">
              Show all...
            </button>
          </Link>
        </div>
        <div className="mx-auto mt-3">
          <h1 className="text-center text-semibold text-gray-600 my-2">
            FoodItems Overview
          </h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>Food image</Table.HeadCell>
              <Table.HeadCell>Food name</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {food.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    <img
                      src={item.foodImage}
                      alt="food-image"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{item.foodName}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Link
            to="/dashboard?tab=foodItem"
            className="flex justify-center mt-1 mb-3"
          >
            <button className="bg-transparent outline-none text-blue-500 hover:underline">
              Show all...
            </button>
          </Link>
        </div>
        <div className="mx-auto mt-3">
          <h1 className="text-center text-semibold text-gray-600 my-2">
            Categories Overview
          </h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>Category id</Table.HeadCell>
              <Table.HeadCell>Category name</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {categories.map((cat) => (
                <Table.Row key={cat._id}>
                  <Table.Cell>
                    <img
                      src={cat.categoryImage}
                      alt="category-image"
                      className="w-10 h-10 rounded-full bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{cat.categoryName}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Link
            to="/dashboard?tab=categories"
            className="flex justify-center mt-1 mb-3"
          >
            <button className="bg-transparent outline-none text-blue-500 hover:underline">
              Show all...
            </button>
          </Link>
        </div>
        <div className="mx-auto mt-3">
          <h1 className="text-center text-semibold text-gray-600 my-2">
            Comments Overview
          </h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {comments.map((c) => (
                <Table.Row key={c._id}>
                  <Table.Cell>{c.content}</Table.Cell>
                  <Table.Cell>{c.likes.length}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Link
            to="/dashboard?tab=comments"
            className="flex justify-center mt-1 mb-3"
          >
            <button className="bg-transparent outline-none text-blue-500 hover:underline">
              Show all...
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashOverview;
