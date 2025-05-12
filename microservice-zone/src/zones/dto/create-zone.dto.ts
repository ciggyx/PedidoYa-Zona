import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateZoneDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  id: number;

  @IsString()
  @MaxLength(30)
  name: string;

  @IsInt()
  @IsPositive()
  radius: number;

  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;
}
