import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/a/a9/Indian_-_Food.jpg',
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
