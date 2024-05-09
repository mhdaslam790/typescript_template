import { Application } from "express";
import { loggerDev } from "../utils/logger";
import { dbLoader } from "./sqldb";
import { IModelDI } from "../types/dependencyInjector";
import { User } from "../entity/user";
import dependencyInjector from "./dependencyInjector";
import { expressLoader } from "./express";
import { DataSource } from "typeorm";
import  RepositoryConstant  from "../constants/repositoryConstant";

export const loaders = async (app: Application): Promise<void> => {
    loggerDev.info("Loaders running");
    const dataSource: DataSource = await dbLoader();

    const dataSourceModel: IModelDI = { name: "dataSource", model: dataSource };
    const userDataSourceModel: IModelDI = {
        name: RepositoryConstant.userDataSource, model: dataSource.getRepository(User),
    };
    await dependencyInjector({ models: [dataSourceModel, userDataSourceModel] });
    loggerDev.info('Dependency Injector loaded');
    loggerDev.info('Jobs loaded');

    await expressLoader(app);
}