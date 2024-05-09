import dotenv from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't found .env file");
}
export const config = {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    dbType: process.env.DBTYPE || "mysql",
    dbHost: process.env.DBHOST || "localhost",
    dbport: Number(process.env.DBPORT) || 3306,
    dbUsername: process.env.DBUSERNAME || "root",
    dbPassword: process.env.DBPASSWORD || "",
    
    dbDatabase: process.env.DBDATABASE || "test",
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },
    api: {
        prefix: '/api',
    },

}


export enum MODES {
    TEST = 'test',
    LOCAL = 'local',
    DEV = 'development',
    PROD = 'production',
}