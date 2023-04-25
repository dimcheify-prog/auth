import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth_db'
}).promise();




const start = async () => {
    try {
        // await mongoose.connect(process.env.DB_URL);
        app.listen(port, () => console.log('server is running'));
    } catch (err) {
        console.log(err);
    }
};

start();