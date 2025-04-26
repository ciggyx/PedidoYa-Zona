import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLocationDto: UpdateLocationDto): string;
    remove(id: string): string;
}
