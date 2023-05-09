import {pool} from "../index.js";

class TokenQueries {
    async findByUserId(userId) {
        const [rows] = await pool.query(`
            SELECT * FROM token WHERE userId=?
        `, [userId]);
        if (rows.length < 1) {
            return false;
        }
        return rows;
    };

    async findByRefeshToken(refreshToken) {
        const [rows] = await pool.query(`
            SELECT * FROM token WHERE refreshToken=?
        `, [refreshToken]);
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

    async updateToken(tokenId, newRefreshToken) {
        const [rows] = await pool.query(`
            UPDATE token SET refreshToken=? WHERE id=?
        `, [newRefreshToken, tokenId]);
        if(rows.length < 1) {
            return false;
        }
        return rows;
    };
}

export const Token = new TokenQueries();