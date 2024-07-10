import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateSuccess,
  updateFailure,
  updateStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from '../redux/user/userSlice';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Link } from 'react-router-dom';
const DashProfile = () => {
  const { existingUser, error } = useSelector((state) => state.hunguser);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [userUpdateFailed, setUserUpdateFailed] = useState(null);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [SignoutError, setSignoutError] = useState(null);
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUserUpdateFailed('No changes made');
      return;
    }
    try {
      dispatch(updateStart());
      setUserUpdateFailed(null);
      const res = await fetch(`/api/v4/user/update/${existingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUserUpdateFailed(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUserUpdateSuccess('User updated successfully');
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUserUpdateFailed(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v4/user/delete/${existingUser._id}`, {
        method: 'DELETE',
      });
      const data = res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      deleteUserFailure(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/v4/user/signout`, {
        method: 'POST',
      });
      const data = res.json();
      if (!res) {
        setSignoutError(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      setSignoutError(error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image(File should be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
        });
      }
    );
  };

  return (
    <div className="mx-auto max-w-lg w-full p-3">
      <h1 className="text-center my-5 mb-5 text-3xl font-semibold font-sans">
        Profile
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        ref={filePickerRef}
        hidden
      />
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div
          className="relative w-40 h-40 mx-auto cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: '#FF5733 ',
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || existingUser.profilePicture}
            alt="user"
            className={`w-full h-full object-cover rounded-full border-8 border-[gray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={existingUser.username}
          className="mt-3"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={existingUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="password"
          placeholder="password"
          defaultValue="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone={'pinkToOrange'} outline>
          Submit
        </Button>
        {existingUser.isAdmin && (
          <Link to={'/dashboard/create-food'}>
            <Button
              type="button"
              gradientDuoTone={'purpleToBlue'}
              outline
              className="w-full"
            >
              Create food item
            </Button>
          </Link>
        )}
      </form>
      <div className="flex flex-row justify-between mt-5 text-red-500">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign out
        </span>
      </div>
      {userUpdateFailed && (
        <Alert color="failure" className="mt-5">
          {userUpdateFailed}
        </Alert>
      )}
      {userUpdateSuccess && (
        <Alert color="success" className="mt-5">
          {userUpdateSuccess}
        </Alert>
      )}
      {error && (
        <Alert color="success" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400" />
            <h3 className="text-xl text-gray-600">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-2 mt-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray">No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
