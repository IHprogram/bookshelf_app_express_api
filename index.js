import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import mongoURI from './mongouri.js';
import bookRoutes from './routes/books.js';
import noteRoutes from './routes/notes.js';

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
}

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions));

app.use('/books', bookRoutes);
app.use('/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send("Hello World!");
})

const PORT = process.env.REACT_APP_PORT || 3002;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`${PORT}に接続しました`)
  }))
