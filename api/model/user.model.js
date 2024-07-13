import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        'https://freerangestock.com/sample/118432/business-man-profile-vector.jpg',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
