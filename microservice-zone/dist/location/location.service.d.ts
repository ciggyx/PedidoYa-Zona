import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationService {
    create(createLocationDto: CreateLocationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLocationDto: UpdateLocationDto): string;
    remove(id: number): string;
}
