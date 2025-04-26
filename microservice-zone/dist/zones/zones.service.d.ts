import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
export declare class ZonesService {
    create(createZoneDto: CreateZoneDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateZoneDto: UpdateZoneDto): string;
    remove(id: number): string;
}
