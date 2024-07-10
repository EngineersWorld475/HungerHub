import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../componants/DashSidebar';
import DashProfile from '../componants/DashProfile';
import DashCategories from '../componants/DashCategories';
import DashFooitems from '../componants/DashFooitems';

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
    </div>
  );
};

export default Dashboard;
