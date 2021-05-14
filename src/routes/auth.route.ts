import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import QueryController from '@controllers/query.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { CreateQueryDto } from '@dtos/queries.dto';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/';
  public router = Router();
  public authController = new AuthController();
  public queryController = new QueryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    // this.router.post(`${this.path}api/v1/parse`, validationMiddleware(CreateQueryDto, 'body'), this.queryController.createQuery);
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
