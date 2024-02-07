import { ErrorRequestHandler } from "express";
import { ErrorRo } from "../types/appRo";
import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { logger, loggerDev } from '../utils/logger';

const errorRequest: ErrorRequestHandler = (err, req, res, _) => {
    logger.error(err.message);
    // If the error is not an HTTP error, the whole object is printed through console.error
    if (!createError.isHttpError(err)) {
      loggerDev.error(err);
    }
    const status = err.status ?? httpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).send(ErrorRo(status, err.message));
  };
  
  export { errorRequest };
  
  export default errorRequest;