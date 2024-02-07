import { config } from "../config";
import mongoose from "mongoose";
import { loggerDev } from "../utils/logger";

export const mongooseLoader = async () => {
    const db = config.dbUrl;

    try {
       
        const mongoConnection = await mongoose.connect(db,);
        loggerDev.info('MongoDB has been connected');
        return mongoConnection.connection.db;
    }
    catch (err) {
        loggerDev.error(`mongo error ${err}`);
        process.exit(1);
    }
}