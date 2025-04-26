import { DeliveryStatusService } from './delivery-status.service';
import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
export declare class DeliveryStatusController {
    private readonly deliveryStatusService;
    constructor(deliveryStatusService: DeliveryStatusService);
    create(createDeliveryStatusDto: CreateDeliveryStatusDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDeliveryStatusDto: UpdateDeliveryStatusDto): string;
    remove(id: string): string;
}
