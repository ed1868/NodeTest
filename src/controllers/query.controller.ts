import { NextFunction, Request, Response } from 'express';
import { CreateQueryDto } from '@/dtos/queries.dto';
import { Query } from '@interfaces/query.interface';

import queryService from '@services/query.service';



class QueryController {
    public queryService = new queryService();

    public getQueries = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllQueriesData = Query[] = await this.queryService.findAllQueries();
            res.status(200).json({ data: findAllQueriesData, message: 'I just got all the queries' });
        } catch (err) {
            if (err) {
                next(err);
            }
        }
    }



    public createQuery = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const queryData: CreateQueryDto = req.body;
            const createQueryData: Query = await this.queryService.createQuery(queryData);

            res.status(201).json({ data: createQueryData, message: 'created a query and parsed it ' });
        } catch (err) {
            if (err) {
                next(err);
            }

        }
    };




}

export default QueryController;
