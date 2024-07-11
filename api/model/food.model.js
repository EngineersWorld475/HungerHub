import mongoose from 'mongoose';

const foodSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: 'Category',
      required: true,
    },
    foodImage: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/e/e6/Indian_food_set.JPG',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model('Food', foodSchema);
export default Food;
