import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [foodCreateError, setFoodCreateError] = useState(null);

  const getCategories = async () => {
    try {
      const res = await fetch(`/api/v4/category/get-categories`);
      const data = await res.json();
      if (!res) {
        console.log(data.message);
      } else {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v4/food/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = res.json();

      if (!res.ok) {
        setFoodCreateError(data.message);
      } else {
        navigate('/dashboard?tab=foodItem');
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setFoodCreateError(error.message);
    }
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
            setFormData({ ...formData, foodImage: downloadUrl });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  console.log(formData);

  return (
    <div className=" p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center text-3xl font-semibold mb-5">
        Create food item
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="restaurant"
            placeholder="Enter restaurant"
            className="flex-1"
            required
            onChange={(e) =>
              setFormData({ ...formData, restaurant: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categories &&
              categories.map((cat) => {
                return (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                );
              })}
          </Select>
        </div>
        <TextInput
          id="foodName"
          placeholder="Enter food item"
          className="flex-1"
          required
          onChange={(e) =>
            setFormData({ ...formData, foodName: e.target.value })
          }
        />
        <div className="flex flex-row border border-teal-500 p-3 justify-between gap-2">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            gradientDuoTone="purpleToBlue"
            size="sm"
            onClick={uploadImage}
            disabled={imageUploadProgress}
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
        {formData && formData.foodImage && (
          <img
            src={formData.foodImage}
            alt="upload"
            className="w-full h-60 object-cover"
          />
        )}
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <TextInput
            id="price"
            placeholder="Enter price"
            className="flex-1"
            required
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </Select>
        </div>
        <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>
          Submit
        </Button>
      </form>
      {foodCreateError && (
        <Alert color="failure" className="mt-3">
          {foodCreateError}
        </Alert>
      )}
    </div>
  );
};

export default CreateFood;
