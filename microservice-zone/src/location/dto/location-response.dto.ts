import { Expose } from 'class-transformer';

export class LocationResponseDto {
  @Expose()
  lat: number;

  @Expose()
  lng: number;
}
