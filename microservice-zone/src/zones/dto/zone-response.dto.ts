import { Expose, Type } from 'class-transformer';
import { LocationResponseDto } from 'src/location/dto/location-response.dto';

export class ZoneResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  radius: number;

  @Expose()
  @Type(() => LocationResponseDto)
  location: LocationResponseDto;
}
