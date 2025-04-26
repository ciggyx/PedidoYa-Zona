import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
export declare class ZonesController {
    private readonly zonesService;
    constructor(zonesService: ZonesService);
    create(createZoneDto: CreateZoneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateZoneDto: UpdateZoneDto): string;
    remove(id: string): string;
}
