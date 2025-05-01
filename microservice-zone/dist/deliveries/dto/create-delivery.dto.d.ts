import { CreateLocationDto } from "src/location/dto/create-location.dto";
export declare class CreateDeliveryDto {
    id?: number;
    address?: string;
    personId: string;
    radius: number;
    status?: string;
    location: CreateLocationDto;
}
