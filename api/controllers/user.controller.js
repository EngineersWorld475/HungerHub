import bcryptjs from 'bcryptjs';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
// register User controller
export const signupController = async (req, res, next) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !phone ||
      !address ||
      username === '' ||
      email === '' ||
      password === '' ||
      phone === '' ||
      address === ''
    ) {
      return next(errorHandler(400, 'All fields required'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).send({
        success: false,
        message: 'User has already registered',
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    return res.status(201).send({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// login user controller
export const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
      return res.status(400).send({
        success: false,
        message: 'All fields are required',
      });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User is not registered'));
    }
    const passwordCheck = bcryptjs.compareSync(password, validUser.password);
    if (!passwordCheck) {
      return next(errorHandler(400, 'Invalid credentials'));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
