import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import MobileApp from './pages/MobileApp';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './componants/Header';
import PrivateRoute from './componants/PrivateRoute';
import Dashboard from './pages/Dashboard';
import PrivateAdminRoute from './componants/PrivateAdminRoute';
import DashCategories from './componants/DashCategories';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateAdminRoute />}></Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
