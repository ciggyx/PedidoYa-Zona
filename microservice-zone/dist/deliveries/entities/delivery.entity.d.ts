import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
export declare class Delivery {
    id: number;
    address: string;
    personId: string;
    radius: number;
    status: DeliveryStatus;
    location: Location;
    constructor(id: number, address: string, personId: string, radius: number, status: DeliveryStatus, location: Location);
}
