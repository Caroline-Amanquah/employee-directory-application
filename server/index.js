import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/employeeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/yourDatabaseName';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MONGO_URL)
  .then(() => console.log('DB Connected Successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => res.send('Hello From Express'));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.use("/api", route);
