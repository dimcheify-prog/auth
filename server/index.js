import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {router} from "./router/index.js";
import {errorMiddleware} from "./middleware/errorMiddleware.js";
import {authMiddleware} from "./middleware/authMiddleware.js";
import mysql2 from "mysql2";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(authMiddleware);
app.use(errorMiddleware);

export const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();



// TODO: добавить проверку подключения к бд
const start = async () => {
    try {
        app.listen(port, () => console.log('server is running'));
    } catch (err) {
        console.log(err);
    }
};

start();