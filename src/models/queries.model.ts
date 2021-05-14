// USING MONGOOSE MODEL SCHEMAS
import { model, Schema, Document } from 'mongoose';
import { Query } from '@interfaces/query.interface';

const querySchema: Schema = new Schema({
  query: {
    type: String,
    required: true,
  },
  encryptedQuery: {
    type: String,
    // required: true,
  },
});

const queryModel = model<Query & Document>('Query', querySchema);

export default queryModel;
