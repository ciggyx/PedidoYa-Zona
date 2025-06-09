import { Zone } from 'src/zones/entities/zone.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
import { Location } from 'src/location/entities/location.entity';

export class DeliveryWithZonesDto {
  id: number;
  personId: string;
  location: Location;
  radius: number;
  status: DeliveryStatus;
  zones: Zone[];
}