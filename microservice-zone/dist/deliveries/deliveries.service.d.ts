import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
export declare class DeliveriesService {
    private readonly deliveryRepository;
    private readonly locationRepository;
    private readonly deliveryStatusRepository;
    constructor(deliveryRepository: Repository<Delivery>, locationRepository: Repository<Location>, deliveryStatusRepository: Repository<DeliveryStatus>);
    create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery>;
    findAll(): Promise<Delivery[]>;
    findOne(id: number): Promise<Delivery | null>;
    update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery | null>;
    remove(id: number): Promise<void>;
}
