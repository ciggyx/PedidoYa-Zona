import { Type } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { UpdateLocationDto } from 'src/location/dto/update-location.dto';

export class UpdateZoneDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  radius?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  location?: UpdateLocationDto;
}
