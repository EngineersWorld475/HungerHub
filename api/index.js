import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import categoryRouter from './routes/category.route.js';
import foodRouter from './routes/food.route.js';
import commentRouter from './routes/comment.route.js';
import orderRouter from './routes/order.route.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v4/user', userRouter);
app.use('/api/v4/category', categoryRouter);
app.use('/api/v4/food', foodRouter);
app.use('/api/v4/comment', commentRouter);
app.use('/api/v4/order', orderRouter);
app.listen(5000, () => {
  console.log('server is running on port 5000!!!');
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('mongodb is connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

// app.use()
// imedward171
// jmtMXhKm8yvgNpBF
// mongodb+srv://imedward171:jmtMXhKm8yvgNpBF@hungerhub.fgm4yez.mongodb.net/
