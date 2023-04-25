import {Router} from "express";
import userController from "../controllers/UserController.js";
import {body} from "express-validator";

export const router = new Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/profile/:id');