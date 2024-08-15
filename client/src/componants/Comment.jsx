import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState([]);
  const { existingUser } = useSelector((state) => state.hunguser);
  const getUser = async () => {
    try {
      const res = await fetch(`/api/v4/user/get-user/${comment.userId}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUser(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [comment.useId]);
  console.log(user);
  return (
    <div className="flex flex-col w-96 mb-5">
      <div className="flex flex-row gap-2 items-center mt-5">
        <img
          src={user && user.profilePicture}
          alt="user_image"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col items-start">
          <p className="text-xs italic text-gray-600">
            @ {user && user.username}
          </p>
          <p className="text-sm text-gray-800">{comment && comment.content}</p>
          <div className="flex flex-row gap-3">
            <button
              className={`text-gray-500 cursor-pointer ${
                existingUser &&
                comment.likes.includes(existingUser._id) &&
                'text-green-500'
              }`}
              onClick={() => onLike(comment._id)}
            >
              <FaThumbsUp className="text-sm" />
            </button>
            {comment && comment.likes.length > 0 && (
              <p className="text-xs text-gray-500">
                {comment.likes.length} like
              </p>
            )}
            {existingUser && existingUser._id === comment.userId && (
              <p className="text-xs text-gray-600">Delete</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
