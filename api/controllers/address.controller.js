import Address from '../model/address.model.js';
import { errorHandler } from '../utils/error.js';

export const createAddress = async (req, res, next) => {
  try {
    const { street, city, state, postalCode, country, phone } = req.body;
    if (!street || !city || !state || !postalCode || !country || !phone) {
      return next(errorHandler(403, 'All fields are required'));
    }
    const address = await new Address({
      userId: req.user.id,
      street,
      city,
      state,
      postalCode,
      country,
      phone,
    }).save();
    return res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return next(errorHandler(403, 'You are not allowed to get the address'));
    }
    const address = await Address.find({ userId }).populate('userId');
    return res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findByIdAndUpdate(
      addressId,
      {
        $set: {
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          country: req.body.country,
          phone: req.body.phone,
        },
      },
      { new: true }
    );
    return res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};
