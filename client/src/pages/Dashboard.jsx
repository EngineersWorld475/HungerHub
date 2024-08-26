import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../componants/DashSidebar';
import DashProfile from '../componants/DashProfile';
import DashCategories from '../componants/DashCategories';
import DashFooitems from '../componants/DashFooitems';
import Orders from './Orders';
import DashOrders from '../componants/DashOrders';
import DashUsers from '../componants/DashUsers';
import DashAddress from '../componants/DashAddress';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* side bar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile />}
      {tab === 'categories' && <DashCategories />}
      {tab === 'foodItem' && <DashFooitems />}
      {tab === 'orders' && <Orders />}
      {tab === 'admin-orders' && <DashOrders />}
      {tab === 'users' && <DashUsers />}
      {tab === 'address' && <DashAddress />}
    </div>
  );
};

export default Dashboard;
