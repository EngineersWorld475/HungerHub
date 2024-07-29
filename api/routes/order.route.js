import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrders,
  updateOrder,
} from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import express from 'express';
const router = express.Router();

router.post('/create-order', verifyToken, createOrder);
router.get('/get-orders/:userId', verifyToken, getOrders);
router.get('/get-orders', verifyToken, getAllOrders);
router.put('/update-order/:orderId', verifyToken, updateOrder);
router.delete('/delete-order/:orderId', verifyToken, deleteOrder);
export default router;
