import Order from '../model/order.model.js';
import { errorHandler } from '../utils/error.js';

export const createOrder = async (req, res, next) => {
  try {
    const { foodItems, buyer } = req.body;
    const order = await new Order({
      foodItems,
      buyer,
    }).save();
    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to access orders'));
    }
    const orders = await Order.find({ buyer: req.params.userId }).populate(
      'foodItems'
    );
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to get orders'));
    }
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('foodItems');
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to update order'));
    }
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: {
          ...req.body,
          status: req.body.status,
        },
      },
      { new: true }
    );
    return res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete order'));
    }
    await Order.findByIdAndDelete(req.params.orderId);
    return res.status(200).json('Order deleted successfully');
  } catch (error) {
    next(error);
  }
};
