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
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
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

export const googleAuth = async (req, res, next) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest)
        .select('-password');
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedGeneratedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        name.toLowerCase().split(' ').join('') +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedGeneratedPassword,
      profilePicture: googlePhotoUrl,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, ...rest } = newUser._doc;
    return res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  console.log(req.user);
  if (req.user.id !== req.params.userId) {
    next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    console.log(req.body.username);
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, `Username must be between 7 and 20 characters`)
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username can not contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete users'));
    }
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json('user deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const signOutUser = async (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'User has been signed out successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.params.userId });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not eligible to get users list'));
    }
    const users = await User.find({}).sort({ createdAt: -1 });
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
