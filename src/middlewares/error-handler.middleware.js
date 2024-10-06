import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .render('error', { message: err.message });
};

export default errorHandler;
