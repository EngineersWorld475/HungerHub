import { Alert, Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v4/user/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message);
      } else {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-10">
        {/* left side */}
        <div className="flex-1 md:mt-20">
          <Link to="/" className="text-5xl font-bold dark:text-white">
            <span className="px-2 py-1 rounded-100 rounded-lg text-white bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 rounded-100 ">
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
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              className="w-full mt-2"
              outline
            >
              Sign in
            </Button>
          </form>
          <div className="mt-3 text-blue-500">
            <span>Don't have an account?</span>
            <Link to="/sign-up"> Sign up</Link>
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

export default Signin;
