import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error-handler.middleware.js';
import notFound from './middlewares/not-found.middleware.js';
import { auth } from './features/auth/index.js';
import { messages } from './features/messages/index.js';

const app = express();

app.set('views', './src/views/pages');
app.set('view engine', 'pug');

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

app.use('/', auth);
app.use('/messages', messages);

app.use(notFound);
app.use(errorHandler);

export default app;
