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
      .replace(/[^a-zA-z0-10]/g, '-');

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
    const limit = req.query.limit || 10;
    const food = await Food.find({}).limit(limit);
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
      next(errorHandler(403, 'You are not allowed to delete this food item'));
    }

    await Food.findByIdAndDelete(req.params.foodId);
    res.status(200).json({
      message: 'Food item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const showMore = async (req, res, next) => {
  try {
    const startIndex = req.params.start;
    const items = await Food.find({}).skip(startIndex).limit(10);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const searchFoodItem = async (req, res, next) => {
  try {
    const { keyword } = req.params;
    const items = await Food.find({
      $or: [
        { restaurant: { $regex: keyword, $options: 'i' } },
        { foodName: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getFoodByCategory = async (req, res, next) => {
  try {
    const items = await Food.find({ category: req.params.catId });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const filterFoodItems = async (req, res, next) => {
  try {
    const args = {};
    if (req.body.price.length > 0) {
      const [minPrice, maxPrice] = req.body.price;
      args.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (req.body.category) {
      args.category = req.body.category;
    }
    console.log(args);
    const foodItems = await Food.find(args);
    return res.status(200).json(foodItems);
  } catch (error) {
    next(error);
  }
};
