import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {
  HiUser,
  HiArrowRight,
  HiDocumentText,
  HiUserGroup,
} from 'react-icons/hi';
import {
  FaClipboardList,
  FaMapMarkedAlt,
  FaChartPie,
  FaComment,
} from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const { existingUser } = useSelector((state) => state.hunguser);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  });
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {existingUser && existingUser.isAdmin && (
            <Link to={'/dashboard?tab=dash'}>
              <Sidebar.Item
                active={tab === 'dash'}
                icon={FaChartPie}
                labelColor="dark"
                className="cursor-pointer mb-2"
                as={'div'}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          {existingUser && (
            <Link to={'/dashboard?tab=profile'}>
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label={existingUser.isAdmin ? 'Admin' : 'User'}
                labelColor="dark"
                className="cursor-pointer"
                as={'div'}
              >
                Profile
              </Sidebar.Item>
            </Link>
          )}
          {existingUser && !existingUser.isAdmin && (
            <Link to={'/dashboard?tab=address'}>
              <Sidebar.Item
                active={tab === 'address'}
                icon={FaMapMarkedAlt}
                labelColor="dark"
                className="cursor-pointer mt-2"
                as={'div'}
              >
                Delivery Address
              </Sidebar.Item>
            </Link>
          )}
          {existingUser && !existingUser.isAdmin && (
            <Link to={'/dashboard?tab=orders'}>
              <Sidebar.Item
                active={tab === 'orders'}
                icon={FaClipboardList}
                labelColor="dark"
                className="cursor-pointer my-2"
                as={'div'}
              >
                My orders
              </Sidebar.Item>
            </Link>
          )}
          {existingUser.isAdmin && (
            <Link to={'/dashboard?tab=admin-orders'}>
              <Sidebar.Item
                active={tab === 'orders'}
                icon={FaClipboardList}
                labelColor="dark"
                className="cursor-pointer my-2"
                as={'div'}
              >
                Orders list
              </Sidebar.Item>
            </Link>
          )}
          {existingUser.isAdmin && (
            <Link to={'/dashboard?tab=categories'}>
              <Sidebar.Item
                active={tab === 'categories'}
                icon={HiDocumentText}
                labelColor="dark"
                className="cursor-pointer my-2"
                as={'div'}
              >
                Categories
              </Sidebar.Item>
            </Link>
          )}
          {existingUser.isAdmin && (
            <Link to={'/dashboard?tab=foodItem'}>
              <Sidebar.Item
                active={tab === 'foodItem'}
                icon={GiKnifeFork}
                labelColor="dark"
                className="cursor-pointer my-2"
                as={'div'}
              >
                Food items
              </Sidebar.Item>
            </Link>
          )}
          {existingUser.isAdmin && (
            <Link to={'/dashboard?tab=users'}>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiUserGroup}
                labelColor="dark"
                className="cursor-pointer my-2"
                as={'div'}
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {existingUser.isAdmin && (
            <Link to={'/dashboard?tab=comments'}>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={FaComment}
                labelColor="dark"
                className="cursor-pointer my-2"
                as={'div'}
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active
            icon={HiArrowRight}
            className="cursor-pointer"
            as={'div'}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
