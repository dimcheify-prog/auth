import {pool} from "../index.js";

class TokenQueries {
    async findOne(userId) {
        const [rows] = await pool.query(`
            SELECT * FROM token WHERE id=?
        `, [id]);
        if (rows.length < 1) {
            return false;
        }
        return rows;
    };

    async create(userId, refreshToken) {
        const [result] = await pool.query(`
            INSERT INTO token (userId, refreshToken) VALUES (?, ?)
        `, [userId, refreshToken]);
        return result;
    };

    async deleteOne(refreshToken) {
        const [result] = await pool.query(`
            DELETE FROM token WHERE refreshToken=?
        `, [refreshToken]);
    };
}

export const Token = new TokenQueries();