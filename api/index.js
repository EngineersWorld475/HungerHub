import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
const app = express();
dotenv.config();
app.use(express.json());
app.use('/api/v4/user', userRouter);
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
