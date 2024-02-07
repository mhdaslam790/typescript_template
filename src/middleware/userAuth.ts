import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import handler from 'express-async-handler';
import createError from 'http-errors';
import httpStatus from 'http-status-codes';
import { config } from "../config";


const userAuth: RequestHandler = handler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization");
    if (!token) {
        next(createError(httpStatus.UNAUTHORIZED, "No token, authentication denied"),);
    }
    const jwtSecret = config.jwtSecret;
    jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err) {
            next(createError(httpStatus.BAD_REQUEST, 'Token not valid'));
            return;
         }
         next();
    });
});

export {userAuth};
export default userAuth;