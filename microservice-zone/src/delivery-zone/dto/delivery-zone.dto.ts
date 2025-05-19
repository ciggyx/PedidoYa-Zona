import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeliveryZones {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  zoneIds: number[];
}