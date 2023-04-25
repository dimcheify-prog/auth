import mysql2 from "mysql2";

export const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth_db'
}).promise();

