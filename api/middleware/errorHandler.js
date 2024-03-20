import Logger from './logger.js';

const ErrorHandler = (err, req, res, next) => {
  const logger = new Logger();

  logger.logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );
  console.log(err.stack);

  res.status(500).json({
    errorStatus: true,
    statusCode: 500,
    code: '--api/server-error',
    message: err.message ? err.message : 'Something went wrong',
    details: {
      stacks: process.env.NODE_ENV !== 'production' && err?.stack
    }
  });

  // Pass the error to the next middleware
  next(err);
};

export default ErrorHandler;
