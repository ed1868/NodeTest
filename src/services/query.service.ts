import bcrypt from 'bcrypt';
import { CreateQueryDto } from '@dtos/queries.dto';
import HttpException from '@exceptions/HttpException';
import { Query } from '@interfaces/query.interface';
import queryModel from '@models/queries.model';
import { isEmpty } from '@utils/util';

class QueryService {
  public queries = queryModel;

  public async findAllQueries(): Promise<Query[]> {
    const queries: Query[] = await this.queries.find();
    return queries;
  }

  public async createQuery(queryData: CreateQueryDto): Promise<Query> {
    if (isEmpty(queryData)) throw new HttpException(400, 'You need to enter a query');

    const strRegex = /([0-9A-Z]{8})([0-9A-Z]{10})([0-9]{3})([0-9]{4})/;
    const parsedResult: any = queryData.query.match(strRegex);

    const parsedPayload = {
      query: queryData.query,
      status: 200,
      firstName: parsedResult[1],
      lastName: parsedResult[2],
      clientId: parsedResult[3] + parsedResult[4],
    };

    // USUALLY LIKE HAVING AN ENCRYPTED COPY OF DATA (BLOCKCHAIN HABIT)
    const hashedQuery = await bcrypt.hash(queryData.query, 10);
    const createQueryData: Query = await this.queries.create({ ...parsedPayload, encryptedQuery: hashedQuery });

    return createQueryData;
  }

  public async createQueryTwo(queryData: CreateQueryDto): Promise<Query> {
    if (isEmpty(queryData)) throw new HttpException(400, 'You need to enter a query');

    const strRegex = /([0-9A-Z]{8})([0-9A-Z]{10})([0-9]{3})([0-9]{4})/;
    const parsedResult: any = queryData.query.match(strRegex);

    const firstName = parsedResult[1].replace(/0/g, '');
    const lastName = parsedResult[2].replace(/0/g, '');
    const clientId = parsedResult[3] + '-' + parsedResult[4];
    const parsedPayload = {
      query: queryData.query,
      status: 200,
      firstName: firstName,
      lastName: lastName,
      clientId: clientId,
    };

    // USUALLY LIKE HAVING AN ENCRYPTED COPY OF DATA (BLOCKCHAIN HABIT)
    const hashedQuery = await bcrypt.hash(queryData.query, 10);
    const createQueryData: Query = await this.queries.create({ ...parsedPayload, encryptedQuery: hashedQuery });

    return createQueryData;
  }
}

export default QueryService;
