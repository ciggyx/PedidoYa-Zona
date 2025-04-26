import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
export declare class DeliveryStatusService {
    create(createDeliveryStatusDto: CreateDeliveryStatusDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDeliveryStatusDto: UpdateDeliveryStatusDto): string;
    remove(id: number): string;
}
