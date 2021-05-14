import { Router } from 'express';
import QueryController from '@controllers/query.controller';
import { CreateQueryDto } from '@dtos/queries.dto';
import Route from '@interfaces/routes.interface';

class QueryRoute implements Route {
  public path = '/api';
  public router = Router();
  public queryController = new QueryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/v1/parse`, this.queryController.createQuery);
    this.router.post(`${this.path}v1/parse`, this.queryController.createQuery);
    // this.router.post(`${this.path}api/v1/parse`, CreateQueryDto, this.queryController.createQuery);
    // this.router.post(`${this.path}api/v2/parse`, CreateQueryDto, this.queryController.createQuery);
  }
}

export default QueryRoute;
