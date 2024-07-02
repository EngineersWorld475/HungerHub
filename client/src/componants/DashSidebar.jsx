import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiUser, HiArrowRight, HiDocumentText } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
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
              label={'User'}
              labelColor="dark"
              className="cursor-pointer"
              as={'div'}
            >
              Profile
            </Sidebar.Item>
          </Link>
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
