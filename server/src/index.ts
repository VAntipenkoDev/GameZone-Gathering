import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router/router';
import { errorMiddleware } from './middleware/error-middleware';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const connectToDb = async (connectUrl: string) => {
  if (!connectUrl) {
    console.log('Connect url is empty.');
    process.exit(1);
  }

  await mongoose
    .connect(connectUrl)
    .catch(error => console.log(error));
};

const start = async () => {
  const dbConnectUrl = process.env.DB_CONNECT_URL || '';

  await connectToDb(dbConnectUrl).then(() =>
    app.listen(port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${port}`,
      );
    }),
  );
};

start();
