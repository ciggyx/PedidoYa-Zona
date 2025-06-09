import { IsArray, ArrayNotEmpty, IsInt} from 'class-validator';
import { Type } from 'class-transformer';

export class AssignZoneDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  zoneIds: number[];
}