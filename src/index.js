import express from "express";
import mariadb from "mariadb";
import winston from "winston";

import routes from "./routes/index.js";

const app = express();
app.use(routes);

const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

// Creating a logger using winston logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "uuidError.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "uuidCombined.log" }),
    ],
});

const PORT = 3001;
app.listen(PORT, () => {
    logger.info(`Server running on ${PORT}`);
});

export { pool };