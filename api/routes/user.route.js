import express from 'express';
import {
  googleAuth,
  signinController,
  signupController,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/sign-up', signupController);

router.post('/sign-in', signinController);
router.post('/google', googleAuth);
router.put('/update/:userId', verifyToken, updateUser);
export default router;
