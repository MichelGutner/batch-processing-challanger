import { IsOptional, IsInt, Min, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class ProcessInputDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  batchSize: number;

  @IsOptional()
  @IsString()
  @Length(1, 1, { message: 'Delimiter must be a single character' })
  delimiter: string;
}
