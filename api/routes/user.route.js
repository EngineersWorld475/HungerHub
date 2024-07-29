import express from 'express';
import {
  deleteUser,
  deleteUsers,
  getAllUsers,
  getUser,
  googleAuth,
  signOutUser,
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
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signOutUser);
router.get('/get-user/:userId', verifyToken, getUser);
router.get('/get-users', verifyToken, getAllUsers);
router.delete('/delete-users/:userId', verifyToken, deleteUsers);
export default router;
