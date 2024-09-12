import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700">
            We’d love to hear from you! Whether you have questions, feedback, or
            just want to say hello, feel free to reach out.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              You can reach us through the following channels:
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-1/3">
              <FaPhone className="text-3xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-1/3">
              <FaEnvelope className="text-3xl text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-700">support@foodieapp.com</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-1/3">
              <FaMapMarkerAlt className="text-3xl text-red-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-700">
                  123 Foodie Lane, Culinary City, FL 12345
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
