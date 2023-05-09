import jwt from "jsonwebtoken";
import {TokenModel} from "../models/Token.js";
import {Token} from "../testMYSQL/tokenMethods.js";

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    };

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    };

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    };

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findByUserId(userId);
        console.log(refreshToken)
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return Token.updateToken(tokenData.id, tokenData.refreshToken);
        }
        const token = await Token.create(userId, refreshToken);
        return token;
    };

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne(refreshToken);
        return tokenData;
    };

    async findToken(refreshToken) {
        const tokenData = await Token.findByRefeshToken(refreshToken);
        return tokenData;
    };
}

export default new TokenService();