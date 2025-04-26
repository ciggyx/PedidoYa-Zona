import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveriesController {
    private readonly deliveriesService;
    constructor(deliveriesService: DeliveriesService);
    create(createDeliveryDto: CreateDeliveryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDeliveryDto: UpdateDeliveryDto): string;
    remove(id: string): string;
}
