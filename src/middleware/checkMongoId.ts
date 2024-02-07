import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import createError from "http-errors";
import httpStatus from 'http-status-codes';
 
export const checkObjectId = (id: string) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
    next(createError(httpStatus.BAD_REQUEST, "Invalid object ID"));
    return;
  }
  next();
};
