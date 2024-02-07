import { Application } from "express";
import { loggerDev } from "../utils/logger";
import { mongooseLoader } from "./mongoose";
import { IModelDI } from "../types/dependencyInjector";
import { UserModel } from "../models/users";
import dependencyInjector from "./dependencyInjector";
import { expressLoader } from "./express";

export const loaders = async (app: Application): Promise<void> => {
    loggerDev.info("Loaders running");
    await mongooseLoader();
    const userModel: IModelDI = {
        name: "userModel",
        model: UserModel,
    }
  
    await dependencyInjector({ models: [userModel] });
    loggerDev.info('Dependency Injector loaded');
    loggerDev.info('Jobs loaded');

    await expressLoader(app);
}