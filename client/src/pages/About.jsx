import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaInfoCircle, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            Welcome to Foodie! We are passionate about delivering the best food
            experience to you. Our mission is to make delicious meals accessible
            and convenient for everyone.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-3xl text-orange-500 mr-4" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-700">
            Our mission is to bring high-quality, fresh, and delicious meals to
            your doorstep. We partner with top local restaurants and chefs to
            ensure that you get the best culinary experience. Whether you’re
            craving a quick bite or a gourmet meal, we’ve got you covered!
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <FaClock className="text-3xl text-green-500 mr-4" />
            <h2 className="text-2xl font-semibold">Our Story</h2>
          </div>
          <p className="text-gray-700">
            Founded in 2020, Foodie began with a simple idea: to connect food
            lovers with their favorite restaurants effortlessly. Our team of
            dedicated professionals works tirelessly to improve our service and
            make your food delivery experience as enjoyable as possible.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <FaUsers className="text-3xl text-blue-500 mr-4" />
            <h2 className="text-2xl font-semibold">Meet the Team</h2>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-6">
              <div className="bg-gray-200 p-4 rounded-lg text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Sanjay G Nair</h3>
                <p className="text-gray-600">Founder & CEO</p>
                <p className="text-gray-700 mt-2">
                  Sanjay leads the team with a passion for culinary arts and
                  technology, ensuring that every aspect of the food delivery
                  process is perfect.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Join Us Today!</h2>
          <p className="text-lg text-gray-700 mb-4">
            Ready to experience the best food delivery service? Download our app
            or contact us to get started!
          </p>
          <Link
            to="#"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Download Our App
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
