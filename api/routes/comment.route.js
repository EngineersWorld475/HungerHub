import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment,
  getFoodComments,
  likeComment,
} from '../controllers/comment.controller.js';
const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/get-comments/:foodId', getFoodComments);
router.post('/like-comment/:commentId', verifyToken, likeComment);
export default router;
