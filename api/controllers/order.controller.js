import Order from '../model/order.model.js';

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
      next(errorHandler(403, 'You are not allowed to access orders'));
    }
    const orders = await Order.find({ buyer: req.params.userId }).populate(
      'foodItems'
    );
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};
