import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import mongoURI from './mongouri.js';
import bookRoutes from './routes/books.js';
import noteRoutes from './routes/notes.js';

const app = express();
const port = process.env.REACT_APP_PORT || 3002;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/books', bookRoutes);
app.use('/notes', noteRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => {
    console.log(`${port}に接続しました`)
  }))