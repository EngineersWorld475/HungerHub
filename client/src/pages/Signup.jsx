import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oath from '../componants/Oath';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.address ||
      !formData.phone
    ) {
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`/api/v4/user/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
        setLoading(false);
      }
      navigate('/sign-in');
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-10">
        {/* left side */}
        <div className="flex-1 md:mt-20">
          <Link to="/" className="text-5xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 rounded-100 rounded-lg text-white">
              Hunger
            </span>
            Hub
          </Link>
          <p className="mt-5 text-sm">
            This is HungerHub food delivery platform. you can sign up with your
            email and password.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="">
              <Label value="Your username" />
              <TextInput
                type="text"
                id="username"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                id="email"
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                id="password"
                placeholder="**********"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your address" />
              <TextInput
                type="text"
                id="address"
                placeholder="address"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your phone" />
              <TextInput
                type="text"
                id="phone"
                placeholder="phone"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
              className="w-full mt-2"
              disabled={loading}
              outline
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign up'
              )}
            </Button>
            <Oath />
          </form>
          <div className="mt-3 text-blue-500">
            <span>Have an account?</span>
            <Link to="/sign-in"> Sign in</Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-3">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
