import { Location } from '../../location/entities/location.entity';
export declare class Zone {
    id: number;
    name: string;
    location: Location;
    radius: number;
    constructor(id: number, name: string, location: Location, radius: number);
}
