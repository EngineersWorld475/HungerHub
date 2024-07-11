import Category from '../model/category.model.js';
import { errorHandler } from '../utils/error.js';

export const createCategory = async (req, res, next) => {
  try {
    console.log(req.user);
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create category'));
    }

    if (!req.body.category) {
      return next(errorHandler(400, 'category required'));
    }

    const result = new Category({
      userId: req.user.id,
      categoryName: req.body.category,
      categoryImage: req.body.categoryImage,
    });
    await result.save();

    return res
      .status(201)
      .json({ message: 'Category created successfully', result });
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update category'));
    }

    const result = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          categoryName: req.body.category,
          categoryImage: req.body.categoryImage,
        },
      },
      { new: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, 'You are not allowed to delete this category')
      );
    }

    await Category.findByIdAndDelete(req.params.categoryId);
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
