import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error-handler.middleware.js';
import notFound from './middlewares/not-found.middleware.js';
import { auth } from './features/auth/index.js';
import { membership } from './features/membership/index.js';
import { messages } from './features/messages/index.js';

const app = express();

app.set('views', './src/views/pages');
app.set('view engine', 'pug');

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

app.use('/', messages);
app.use('/auth', auth);
app.use('/membership', membership);

app.use(notFound);
app.use(errorHandler);

export default app;
