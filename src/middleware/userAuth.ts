import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import handler from 'express-async-handler';
import createError from 'http-errors';
import httpStatus from 'http-status-codes';
import { config } from "../config";
import Container from "typedi";
import RepositoryConstant from '../constants/repositoryConstant';
import { Repository } from "typeorm";
import { User } from "../entity/user";


const userAuth: RequestHandler = handler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization").split(" ")[1];
    console.log(token);
    if (!token) {
        next(createError(httpStatus.UNAUTHORIZED, "No token, authentication denied"),);
    }
    const jwtSecret = config.jwtSecret;
    jwt.verify(token, jwtSecret, async function (err, decoded) {
        if (err) {
            next(createError(httpStatus.BAD_REQUEST, 'Token not valid'));
            return;
        }
        if (decoded && decoded.exp >= Math.floor(Date.now() / 1000)) {

            const userRepository: Repository<User> = Container.get(RepositoryConstant.userDataSource);
            const user = await userRepository.findOneBy({ id: decoded.user.id });

            if (user.loginTime != decoded.iat) {
                next(createError(httpStatus.BAD_REQUEST, 'Token not valid'));
            }
            req.userId = decoded.user.id;
            next();
        }

    });
});

export { userAuth };
export default userAuth;