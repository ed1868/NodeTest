import { IsString } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  public query: string;
  @IsString()
  public encryptedQuery: string;
  @IsString()
  public status: string;
  @IsString()
  public firstName: string;
  @IsString()
  public lastName: string;
  @IsString()
  public clientId: string;
}
