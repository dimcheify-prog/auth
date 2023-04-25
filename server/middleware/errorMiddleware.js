import {ApiError} from "../exceptions/apiErrors.js";

export function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({massage: err.message, errors: err.errors});
    }
    console.log(err);
    return res.status(500).json({message: 'Непредвиденная ошибка'});
}