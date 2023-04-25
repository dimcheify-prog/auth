import {UserModel} from "../models/User.js";
import bcrypt from "bcrypt";
import {v4} from "uuid";
import MailService from "./mailService.js";
import TokenService from "./tokenService.js";
import UserDtos from "../dtos/userDtos.js";
import {ApiError} from "../exceptions/apiErrors.js";

class UserService {
    async register(email, password) {
        const candidate = await UserModel.findOne({email: email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4();
        const user = await UserModel.create({email: email, password: hashPassword, activationLink});
        await MailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDtos(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest('Некорректая ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    };

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользовательс данным имейл не был найден');
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.BadRequest('Не верный пароль');
        }

        const userDto = new UserDtos(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    };

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDtos(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };


}

export default new UserService();