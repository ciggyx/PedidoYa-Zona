import { Type } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';

export class CreateZoneDto {
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

