import { StatusCodes } from 'http-status-codes';

const notFound = (_req, res, _next) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .render('error', { message: 'Page Not Found' });
};

export default notFound;
