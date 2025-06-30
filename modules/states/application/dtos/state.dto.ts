import { IsNumber, IsString } from 'class-validator';

export class StateInputDto {
  @IsString()
  stateName: string;

  @IsNumber()
  numberOfPersons: number;
}
