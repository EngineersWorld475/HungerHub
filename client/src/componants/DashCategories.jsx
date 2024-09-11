import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  Alert,
  Button,
  FileInput,
  Modal,
  Table,
  TextInput,
} from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashCategories = () => {
  const { existingUser } = useSelector((state) => state.hunguser);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [createCatError, setCreateCatError] = useState(null);
  const [createSuccess, setCreateCatSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const getCategories = async () => {
    try {
      const res = await fetch(`/api/v4/category/get-categories`);
      const data = await res.json();

      if (!res.json) {
        console.log(data.message);
      } else {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      setShowConfirm(false);
      const res = await fetch(
        `/api/v4/category/delete-category/${existingUser._id}/${catId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log(data.message);
        getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setShowModal(false);
      const res = await fetch(`/api/v4/category/create-category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateCatError(data.message);
      } else {
        setCreateCatSuccess(data.message);
        setImageUploadProgress(null);
        setFormData({
          category: '',
          categoryImage: '',
        });
        getCategories();
      }
    } catch (error) {
      setCreateCatError(error.message);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    try {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Something went wrong in uploading image');
          setImageUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUrl(downloadUrl);
            setFormData({ ...formData, categoryImage: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="p-5 min-h-screen max-w-3xl md:mx-auto">
      <h1 className="text-center text-3xl py-5 font-sans">Categories</h1>
      <Button
        color={'success'}
        className="text-center w-full"
        onClick={() => setShowModal(true)}
        outline
      >
        Create Category
      </Button>
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
          <TextInput
            id="category"
            placeholder="Enter category name"
            className="w-full"
            onChange={handleChange}
            required
          />
          <div className="flex gap-2 justify-between border  border-green-500 p-3 w-full ">
            <FileInput type="file" accept="image/*" onChange={handleImage} />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              disabled={imageUploadProgress}
              onClick={uploadImage}
              outline
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress}%`}
                  />
                </div>
              ) : (
                `Upload Image`
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          {formData.categoryImage && (
            <img
              src={formData.categoryImage}
              alt="upload"
              className="w-30 h-20 object-cover"
            />
          )}

          <div className="flex justify-start">
            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
              className="items-start"
              outline
            >
              Submit
            </Button>
          </div>
          {createCatError && (
            <Alert color="failure" className="mt-2">
              {createCatError}
            </Alert>
          )}
        </form>
      </Modal>

      <Modal show={showConfirm} onClose={() => setShowConfirm(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-400" />
            <h3 className="text-xl text-gray-600">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-center gap-2 mt-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowConfirm(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 ">
        {existingUser.isAdmin && categories.length > 0 ? (
          <>
            <Table className="my-5">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Category image</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {categories.map((cat) => {
                return (
                  <Table.Body key={cat._id}>
                    <Table.Row>
                      <Table.Cell className="text-center">
                        {new Date(cat.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell className="items-center">
                        <img
                          src={cat.categoryImage}
                          alt="categoryPhoto"
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {cat.categoryName}
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="failure"
                          onClick={() => {
                            setShowConfirm(true);
                            setCatId(cat._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
            </Table>
          </>
        ) : (
          <p>You have no category yet</p>
        )}
      </div>
    </div>
  );
};

export default DashCategories;
