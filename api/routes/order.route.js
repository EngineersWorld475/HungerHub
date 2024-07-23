import { createOrder, getOrders } from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import express from 'express';
const router = express.Router();

router.post('/create-order', verifyToken, createOrder);
router.get('/get-orders/:userId', verifyToken, getOrders);

export default router;
