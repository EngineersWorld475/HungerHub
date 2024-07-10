import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createFood,
  getAllFood,
  getSingleFood,
  updateFood,
  deleteFood,
  showMore,
} from '../controllers/food.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createFood);
router.get('/get-food', getAllFood);
router.get('/get-food/:slug', getSingleFood);
router.put('/update-food/:userId/:foodId', verifyToken, updateFood);
router.delete('/delete-food/:userId/:foodId', verifyToken, deleteFood);
router.get('/show-more/:start', showMore);

export default router;
