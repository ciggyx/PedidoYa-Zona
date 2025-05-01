import {IsNumber, IsOptional} from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsNumber()
  lat: number;
  @IsNumber()
  lng: number;
}
