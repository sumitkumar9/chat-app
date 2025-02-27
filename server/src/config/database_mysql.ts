import { Sequelize } from "sequelize";


export const MYSQL_CONNECTION = new Sequelize(
    process.env.DB_INSTANCE as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      timezone: process.env.DB_TIMEZONE,
      logQueryParameters: false,
    }
);