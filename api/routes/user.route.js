import express from 'express';
import {
  googleAuth,
  signinController,
  signupController,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/sign-up', signupController);

router.post('/sign-in', signinController);
router.post('/google', googleAuth);
export default router;
