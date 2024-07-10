import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiUser, HiArrowRight, HiDocumentText } from 'react-icons/hi';
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
