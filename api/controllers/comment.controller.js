import Comment from '../model/comment.model.js';
import { errorHandler } from '../utils/error.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, userId, foodId } = req.body;

    if (userId !== req.user.id) {
      return next(errorHandler(403, 'You are not allowed to create comment'));
    }

    if (!content) {
      return next(errorHandler(400, 'Please fill out the field'));
    }

    const comment = new Comment({
      content,
      userId,
      foodId,
    });
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getFoodComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ foodId: req.params.foodId });
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(400, 'Comment is not available'));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to get all comments'));
    }
    const limit = req.query.limit;
    const comments = await Comment.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete comments'));
    }
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
