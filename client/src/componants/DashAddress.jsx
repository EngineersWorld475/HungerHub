import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

const DashAddress = () => {
  const [address, setAddress] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addressId, setAddressId] = useState('');
  const { existingUser } = useSelector((state) => state.hunguser);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);

    try {
      const res = await fetch(`/api/v4/address/create-address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      });
      const data = await res.json();
      console.log('....data', data);

      if (res.ok) {
        setAddress(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    setEditModal(false);
    try {
      const res = await fetch(`/api/v4/address/update-address/${addressId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      });
      const data = await res.json();
      if (res.ok) {
        setAddress(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    try {
      const res = await fetch(
        `/api/v4/address/get-address/${existingUser._id}`
      );
      const data = await res.json();
      if (data.length > 0) {
        setAddress(data[0]);
      }
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <div className="p-5 min-h-screen max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">Delivery Address</h1>
          {!address._id && (
            <Button
              className="underline bg-white text-black-500"
              onClick={() => setOpenModal(true)}
            >
              Add Address
            </Button>
          )}
        </div>

        {address._id && (
          <div className="bg-gray-100 rounded-lg p-5 shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Current Address</h2>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="text-gray-600">Street:</h3>
                  <p>{address.street}</p>
                </div>
                <div>
                  <h3 className="text-gray-600">City:</h3>
                  <p>{address.city}</p>
                </div>
                <div>
                  <h3 className="text-gray-600">State:</h3>
                  <p>{address.state}</p>
                </div>
                <div>
                  <h3 className="text-gray-600">Postal Code:</h3>
                  <p>{address.postalCode}</p>
                </div>
                <div>
                  <h3 className="text-gray-600">Country:</h3>
                  <p>{address.country}</p>
                </div>
                <div>
                  <h3 className="text-gray-600">Phone:</h3>
                  <p>{address.phone}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                className="bg-green-500 text-white"
                onClick={() => {
                  setEditModal(true);
                  setAddressId(address._id);
                }}
              >
                Edit Address
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <div className="p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
            <TextInput
              id="street"
              placeholder="Enter your street"
              value={address.street || ''}
              onChange={handleChange}
              required
            />
            <TextInput
              id="city"
              placeholder="Enter your city"
              value={address.city || ''}
              onChange={handleChange}
              required
            />
            <TextInput
              id="state"
              placeholder="Enter your state"
              value={address.state || ''}
              onChange={handleChange}
              required
            />
            <div className="flex flex-row gap-3">
              <TextInput
                id="postalCode"
                placeholder="Postal code"
                value={address.postalCode || ''}
                onChange={handleChange}
                required
              />
              <Select
                id="country"
                value={address.country || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select your country</option>
                <option value="China">China</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Russia">Russia</option>
                <option value="Sweden">Sweden</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
              </Select>
            </div>
            <TextInput
              id="phone"
              placeholder="Enter your phone number"
              value={address.phone || ''}
              onChange={handleChange}
              required
            />
            <Button type="submit" gradientDuoTone="purpleToBlue" outline>
              Add Address
            </Button>
          </form>
        </div>
      </Modal>

      <Modal show={editModal} onClose={() => setEditModal(false)} popup>
        <Modal.Header />
        <div className="p-5">
          <form onSubmit={handleEdit} className="flex flex-col gap-3 mt-2">
            <TextInput
              id="street"
              placeholder="Enter your street"
              value={address.street || ''}
              onChange={handleChange}
            />
            <TextInput
              id="city"
              placeholder="Enter your city"
              value={address.city || ''}
              onChange={handleChange}
            />
            <TextInput
              id="state"
              placeholder="Enter your state"
              value={address.state || ''}
              onChange={handleChange}
            />
            <div className="flex flex-row gap-3">
              <TextInput
                id="postalCode"
                placeholder="Postal code"
                value={address.postalCode || ''}
                onChange={handleChange}
              />
              <Select
                id="country"
                value={address.country || ''}
                onChange={handleChange}
              >
                <option value="">Select your country</option>
                <option value="China">China</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Russia">Russia</option>
                <option value="Sweden">Sweden</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
              </Select>
            </div>
            <TextInput
              id="phone"
              placeholder="Enter your phone number"
              value={address.phone || ''}
              onChange={handleChange}
            />
            <Button type="submit" color={'success'} outline>
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DashAddress;
