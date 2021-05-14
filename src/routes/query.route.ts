import { Router } from 'express';
import QueryController from '@controllers/query.controller';
import { CreateQueryDto } from '@dtos/queries.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class QueryRoute implements Route {
  public path = '/';
  public router = Router();
  public queryController = new QueryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}api/v1/parse/all`, this.queryController.createQuery);
    this.router.post(`${this.path}api/v1/parse`, validationMiddleware(CreateQueryDto, 'body'), this.queryController.createQuery);
    this.router.post(`${this.path}api/v2/parse`, validationMiddleware(CreateQueryDto, 'body'), this.queryController.createQueryTwo);
  }
}

export default QueryRoute;
