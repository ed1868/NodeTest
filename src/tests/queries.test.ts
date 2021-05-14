import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateQueryDto } from '@dtos/queries.dto';
import QueryRoute from '@routes/query.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Queries', () => {
  describe('[POST] /api/v1/parse', () => {
    it('response should have parsed and saved query data', async () => {
      const queryData: CreateQueryDto = {
        query: 'JOHN0000MICHAEL0009994567',
        encryptedQuery: await bcrypt.hash('JOHN0000MICHAEL0009994567', 10),
      };

      const queryRoute = new QueryRoute();
      const queries = queryRoute.queryController.queryService.queries;

      queries.find = jest.fn().mockReturnValue(null);
      queries.create = jest.fn().mockReturnValue({
        _id: '00212456',
        query: queryData.query,
        encryptedQuery: queryData.encryptedQuery,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([queryRoute]);
      return request(app.getServer()).post(`${queryRoute.path}api/v1/parse`).send(queryData);
    });
  });

  //   describe('[POST] /login', () => {
  //     it('response should have the Set-Cookie header with the Authorization token', async () => {
  //       const userData: CreateUserDto = {
  //         email: 'test@email.com',
  //         password: 'q1w2e3r4!',
  //       };

  //       const authRoute = new AuthRoute();
  //       const users = authRoute.authController.authService.users;

  //       users.findOne = jest.fn().mockReturnValue({
  //         _id: '60706478aad6c9ad19a31c84',
  //         email: userData.email,
  //         password: await bcrypt.hash(userData.password, 10),
  //       });

  //       (mongoose as any).connect = jest.fn();
  //       const app = new App([authRoute]);
  //       return request(app.getServer())
  //         .post(`${authRoute.path}login`)
  //         .send(userData)
  //         .expect('Set-Cookie', /^Authorization=.+/);
  //     });
  //   });

  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //     const userData: User = {
  //       _id: '60706478aad6c9ad19a31c84',
  //       email: 'test@email.com',
  //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //     };

  //     const authRoute = new AuthRoute();
  //     const users = authRoute.authController.authService.users;

  //     users.findOne = jest.fn().mockReturnValue(userData);

  //     (mongoose as any).connect = jest.fn();
  //     const app = new App([authRoute]);
  //     return request(app.getServer())
  //       .post(`${authRoute.path}logout`)
  //       .send(userData)
  //       .set('Set-Cookie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ')
  //       .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
  //   });
  // });
});
