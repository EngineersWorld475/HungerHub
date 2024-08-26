import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createAddress,
  getAddress,
  updateAddress,
} from '../controllers/address.controller.js';
const router = express.Router();

router.post('/create-address', verifyToken, createAddress);
router.get('/get-address/:userId', verifyToken, getAddress);
router.put('/update-address/:addressId', verifyToken, updateAddress);

export default router;
