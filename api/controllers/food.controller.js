import Food from '../model/food.model.js';
import { errorHandler } from '../utils/error.js';

export const createFood = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create food'));
    }
    if (
      !req.body.restaurant ||
      !req.body.foodName ||
      !req.body.price ||
      !req.body.category
    ) {
      return next(errorHandler(400, 'All fields are required'));
    }

    const slug = req.body.foodName
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-z0-9]/g, '-');

    const newFood = await new Food({
      ...req.body,
      slug,
      userId: req.user.id,
    }).save();

    res.status(201).json(newFood);
  } catch (error) {
    next(error);
  }
};

export const getAllFood = async (req, res, next) => {
  try {
    const food = await Food.find({});
    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

export const getSingleFood = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const food = await Food.find({ slug });
    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    next(errorHandler(403, 'You are not allowed to update this food item'));
  }

  try {
    const food = await Food.findByIdAndUpdate(
      req.params.foodId,
      {
        $set: {
          restaurant: req.body.restaurant,
          foodName: req.body.foodName,
          category: req.body.category,
          price: req.body.price,
          foodImage: req.body.foodImage,
          quantity: req.body.quantity,
        },
      },
      { new: true }
    );
    return res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      next(errorHandler(403, 'You are not allowed to delete this food item'))
    }

    await Food.findByIdAndDelete(req.params.foodId);
    res.status(200).json({
      message: 'Food item deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}