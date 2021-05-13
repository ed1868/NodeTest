import { IsString } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  public query: string;
}
