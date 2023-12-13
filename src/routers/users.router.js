import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';
const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/me', needSignin);
//index -> users.routers

export { usersRouter };
