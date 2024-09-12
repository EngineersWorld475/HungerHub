import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const MobileApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Download Our Mobile App</h1>
          <p className="text-lg text-gray-700 mb-6">
            Enjoy the convenience of ordering your favorite food right from your
            mobile device. Our app is designed to provide a seamless and
            enjoyable experience.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
            >
              <FaApple className="text-2xl" />
              <span className="text-lg">Download on the App Store</span>
            </a>
            <a
              href="#"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
            >
              <FaGooglePlay className="text-2xl" />
              <span className="text-lg">Get it on Google Play</span>
            </a>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            App Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-gray-700 text-center">
                Place your orders with just a few taps. Browse through our menu,
                customize your order, and check out quickly.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-700 text-center">
                Track your order in real-time from preparation to delivery. Get
                updates and stay informed about your order status.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Exclusive Offers</h3>
              <p className="text-gray-700 text-center">
                Receive exclusive offers and promotions through the app. Enjoy
                special discounts and deals that are only available to app
                users.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-700 text-center">
                Make secure payments with various options. Your payment
                information is protected and encrypted.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-gray-700 text-center">
                Enjoy a clean and intuitive interface that makes navigating the
                app simple and enjoyable.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-700 text-center">
                Get support anytime with our 24/7 customer service. We're here
                to help with any issues or questions you may have.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center mt-8">
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} FoodieApp. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MobileApp;
