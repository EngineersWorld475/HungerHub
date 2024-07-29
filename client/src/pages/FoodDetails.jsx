import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../componants/context/cart';
import { Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux';
import Comment from '../componants/Comment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDetails = () => {
  const [foodDetails, setFoodDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [cart, setCart] = useCart();
  const [comment, setComment] = useState('');
  const { existingUser } = useSelector((state) => state.hunguser);
  const { slug } = useParams();
  const getFoodDetails = async () => {
    const res = await fetch(`/api/v4/food/get-food/${slug}`);
    const data = await res.json();
    if (!res.ok) {
      console.log(error.message);
    } else {
      setFoodDetails(data[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/v4/comment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: comment,
          userId: existingUser._id,
          foodId: foodDetails._id,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setComment('');
        getComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    const res = await fetch(`/api/v4/comment/get-comments/${foodDetails._id}`);
    const data = await res.json();
    console.log('...data', data);
    if (!res.ok) {
      console.log(data.message);
    } else {
      setComments(data);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await fetch(`/api/v4/comment/like-comment/${commentId}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setComments(
          comments.map((c) =>
            c._id === commentId
              ? {
                  ...c,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : c
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFoodDetails();
  }, [slug]);

  useEffect(() => {
    getComments();
  }, [foodDetails._id]);
  console.log('cart', cart);
  return (
    <>
      <ToastContainer />

      <div className="min-h-screen">
        <h1 className="text-center text-3xl my-5">Food Item Overview</h1>
        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row">
            <img src={foodDetails && foodDetails.foodImage} />
            <div className="mx-8 text-center flex flex-col gap-5">
              <h1 className="text-2xl text-red-500 my-5 font-semibold">
                {foodDetails && foodDetails.foodName}
              </h1>
              <h3 className="text-xl italic">
                {foodDetails && foodDetails.restaurant}
              </h3>
              <h2 className="text-2xl font-bold">
                {' '}
                &#8377;{foodDetails && foodDetails.price}
              </h2>
              <div className="mt-2.5 flex justify-center">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  5.0
                </span>
              </div>
              <button
                onClick={() => {
                  setCart([...cart, foodDetails]);
                  localStorage.setItem(
                    'hungcart',
                    JSON.stringify([...cart, foodDetails])
                  );
                  toast('item added to cart');
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow mb-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-3xl font-semibold text-green-500 hover:text-orange-500 mt-20 mb-10">
            Share your experience
          </h1>
          <div className="w-96 p-5 border border-orange-500 flex flex-col items-start mb-7">
            <Textarea
              placeholder="Add your review"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              type="btn"
              className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white ml-auto outline-none rounded-md mt-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {comments &&
            comments.map((c) => {
              return <Comment key={c._id} comment={c} onLike={handleLike} />;
            })}
        </div>
      </div>
    </>
  );
};

export default FoodDetails;
