
import { config } from "../config";

import { loggerDev } from "../utils/logger";

import { DataSource } from "typeorm"

export const dbLoader = async () => {

    try {
        const myDataSource = new DataSource({
            type: "mysql",
            host: config.dbHost,
            port: config.dbport,
            username: config.dbUsername,
            password: config.dbPassword,
            database: config.dbDatabase,
            entities: ["build/entity/*.js"],
            logging: true,
            synchronize: true,
        });

        myDataSource.initialize();

        loggerDev.info('Dabasase has been connected');
        return myDataSource;
    }
    catch (err) {
        loggerDev.error(`mongo error ${err}`);
        process.exit(1);
    }
}