import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-10">
        {/* left side */}
        <div className="flex-1 md:mt-20">
          <Link to="/" className="text-5xl font-bold dark:text-white">
            <span
              className="px-2 py-1 rounded-100 rounded-lg text-white"
              style={{ backgroundColor: '#007FFF' }}
            >
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
          <form action="" className="flex flex-col gap-3">
            <div className="">
              <Label value="Your email" />
              <TextInput type="email" id="email" placeholder="email" />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="password"
                id="password"
                placeholder="**********"
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
        </div>
      </div>
    </div>
  );
};

export default Signin;
