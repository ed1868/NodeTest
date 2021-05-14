import { NextFunction, Request, Response } from 'express';
import { CreateQueryDto } from '@/dtos/queries.dto';
import { Query } from '@interfaces/query.interface';

import queryService from '@services/query.service';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

class QueryController {
  public queryService = new queryService();

  public getQueries = async (req: Request, res: Response, next: NextFunction) => {
    console.log('YOU ARE HITTING THE QUERY ROUTE');
    try {
      const findAllQueriesData: Query[] = await this.queryService.findAllQueries();
      res.status(200).json({ data: findAllQueriesData, message: 'I just got all the queries' });
    } catch (err) {
      if (err) {
        next(err);
      }
    }
  };

  public createQuery = async (req: Request, res: Response, next: NextFunction) => {
    console.log('YOU ARE HITTING THE QUERY  CREATE ROUTE : ', req.body);
    try {
      const queryData: CreateQueryDto = req.body;
      const createQueryData: Query = await this.queryService.createQuery(queryData);

      res.status(201).json({ statusCode: 201, data: createQueryData, message: 'created a query and parsed it ' });
    } catch (err) {
      if (err) {
        next(err);
      }
    }
  };

  public createQueryTwo = async (req: Request, res: Response, next: NextFunction) => {
    console.log('YOU ARE HITTING THE QUERY  CREATE 2  ROUTE : ', req.body);
    try {
      const queryData: CreateQueryDto = req.body;
      const createQueryData: Query = await this.queryService.createQueryTwo(queryData);

      res.status(201).json({ statusCode: 201, data: createQueryData, message: 'created a query and parsed it ' });
    } catch (err) {
      if (err) {
        next(err);
      }
    }
  };
}

export default QueryController;
