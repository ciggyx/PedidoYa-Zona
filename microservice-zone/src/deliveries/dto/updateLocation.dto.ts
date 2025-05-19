import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateLocationDto } from '../../location/dto/create-location.dto';

export class UpdateLocationDto {
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;
}
