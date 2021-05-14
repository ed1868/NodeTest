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
    console.log('YOOOO', queryData);
    // USUALLY LIKE HAVING AN ENCRYPTED COPY OF DATA (BLOCKCHAIN HABIT)
    const hashedQuery = await bcrypt.hash(queryData.query, 10);
    const createQueryData: Query = await this.queries.create({ ...queryData, encryptedQuery: hashedQuery });

    return createQueryData;
  }
}

export default QueryService;
