import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create-category', verifyToken, createCategory);
router.get('/get-categories', getAllCategory);
router.put('/update-category/:userId/:categoryId', verifyToken, updateCategory);
router.delete(
  '/delete-category/:userId/:categoryId',
  verifyToken,
  deleteCategory
);
export default router;
