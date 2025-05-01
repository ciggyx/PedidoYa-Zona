import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveriesController {
    private readonly deliveriesService;
    constructor(deliveriesService: DeliveriesService);
    create(createDeliveryDto: CreateDeliveryDto): Promise<import("./entities/delivery.entity").Delivery>;
    findAll(): Promise<import("./entities/delivery.entity").Delivery[]>;
    findOne(id: number): Promise<import("./entities/delivery.entity").Delivery | null>;
    update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<import("./entities/delivery.entity").Delivery | null>;
    remove(id: number): Promise<void>;
}
