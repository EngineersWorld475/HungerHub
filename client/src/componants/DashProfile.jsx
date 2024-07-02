import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {
  const { existingUser } = useSelector((state) => state.hunguser);
  return (
    <div className="mx-auto max-w-lg w-full p-3">
      <h1 className="text-center my-5 mb-5 text-3xl font-semibold font-sans">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <div className="w-40 h-40 mx-auto">
          <img
            src={existingUser.profilePicture}
            alt="user"
            className="w-full h-full object-cover rounded-full border-8 border-[gray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={existingUser.username}
          className="mt-3"
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={existingUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue="password"
        />
        <Button type="submit" gradientDuoTone={'pinkToOrange'} outline>
          Submit
        </Button>
      </form>
      <div className="flex flex-row justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default DashProfile;
