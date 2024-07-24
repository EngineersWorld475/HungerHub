import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.listen(3000, () => {
  console.log('server is running on port 3000!!!');
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('mongodb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

// imedward171
// jmtMXhKm8yvgNpBF
// mongodb+srv://imedward171:jmtMXhKm8yvgNpBF@hungerhub.fgm4yez.mongodb.net/
