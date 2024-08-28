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
import CreateFood from './pages/CreateFood';
import SearchedProducts from './pages/SearchedProducts';
import ItemsByCategory from './pages/ItemsByCategory';
import CartPage from './pages/CartPage';
import FoodDetails from './pages/FoodDetails';
import ScrollToTop from './componants/ScrollToTop';
import Orders from './pages/Orders';
import Footer from './componants/Footer';
import UpdateFood from './pages/UpdateFood';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateAdminRoute />}>
          <Route path="dashboard/create-food" element={<CreateFood />} />
        </Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/searched-products" element={<SearchedProducts />} />
        <Route path="/category-page/:id" element={<ItemsByCategory />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/food-item/:slug" element={<FoodDetails />} />
        <Route path="/update-food/:slug" element={<UpdateFood />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
