import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    foodItems: [
      {
        type: mongoose.ObjectId,
        ref: 'Food',
      },
    ],
    buyer: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'Not process',
      enum: [
        'Not process',
        'Confirmed',
        'Preparing',
        'Ready for pickup',
        'On the way',
        'Delivered',
        'Cancelled',
      ],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
