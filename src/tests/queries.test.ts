import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateQueryDto } from '@dtos/queries.dto';
import QueryRoute from '@routes/query.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Queries v1 parse 1 ', () => {
  describe('[POST] /api/v1/parse', () => {
    it('response should have parsed and saved query data', async () => {
      const query = 'JOHN0000MICHAEL0009994567';
      const strRegex = /([0-9A-Z]{8})([0-9A-Z]{10})([0-9]{3})([0-9]{4})/;
      const parsedResult: any = query.match(strRegex);

      const queryData: CreateQueryDto = {
        query: query,
        status: '200',
        firstName: parsedResult[1],
        lastName: parsedResult[2],
        clientId: parsedResult[3] + parsedResult[4],
        encryptedQuery: await bcrypt.hash('JOHN0000MICHAEL0009994567', 10),
      };

      const queryRoute = new QueryRoute();
      const queries = queryRoute.queryController.queryService.queries;

      queries.find = jest.fn().mockReturnValue(null);
      queries.create = jest.fn().mockReturnValue({
        _id: '00212456',
        query: queryData.query,
        encryptedQuery: queryData.encryptedQuery,
        status: queryData.status,
        firstName: queryData.firstName,
        lastName: queryData.lastName,
        clientId: queryData.clientId,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([queryRoute]);
      return request(app.getServer()).post(`${queryRoute.path}api/v1/parse`).send(queryData);
    });
  });
});

describe('Testing Queries v2 parse 2 ', () => {
  describe('[POST] /api/v2/parse', () => {
    it('response should have parsed and saved query data', async () => {
      const query = 'JOHN0000MICHAEL0009994567';
      const strRegex = /([0-9A-Z]{8})([0-9A-Z]{10})([0-9]{3})([0-9]{4})/;
      const parsedResult: any = query.match(strRegex);

      const queryData: CreateQueryDto = {
        query: query,
        status: '200',
        firstName: parsedResult[1].replace(/0/g, ''),
        lastName: parsedResult[2].replace(/0/g, ''),
        clientId: parsedResult[3] + '-' + parsedResult[4],
        encryptedQuery: await bcrypt.hash('JOHN0000MICHAEL0009994567', 10),
      };

      const queryRoute = new QueryRoute();
      const queries = queryRoute.queryController.queryService.queries;

      queries.find = jest.fn().mockReturnValue(null);
      queries.create = jest.fn().mockReturnValue({
        _id: '00212456',
        query: queryData.query,
        encryptedQuery: queryData.encryptedQuery,
        status: queryData.status,
        firstName: queryData.firstName,
        lastName: queryData.lastName,
        clientId: queryData.clientId,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([queryRoute]);
      return request(app.getServer()).post(`${queryRoute.path}api/v2/parse`).send(queryData);
    });
  });
});
