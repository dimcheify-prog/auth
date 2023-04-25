import {pool} from "../index.js";

class UserQueries {
    async findByEmail(email) {
        const [rows] = await pool.query(`
            SELECT * FROM user WHERE email=?
        `, [email]);
        if (rows.length < 1) {
            return false;
        }
        const [user] = rows
        return user;
    };

    async create(email, password, activationLink) {
        const [result] = await pool.query(`
            INSERT INTO user (email, password, activationLink) VALUES (?, ?, ?)
        `, [email, password, activationLink]);
        return this.findById(result.insertId);
    };

    async findByLink(activationLink) {
        const [rows] = await pool.query(`
            SELECT * FROM user WHERE activationLink=?
        `, [activationLink]);
        return rows;
    };

    async findById(id) {
        const [rows] = await pool.query(`
            SELECT * FROM user WHERE id=?
        `, [id]);
        const [user] = rows;
        return user;
    };
}

export const User = new UserQueries();