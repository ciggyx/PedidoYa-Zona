import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AssignZoneDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  zoneIds: number[];
}