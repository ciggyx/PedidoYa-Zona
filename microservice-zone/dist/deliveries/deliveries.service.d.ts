import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
export declare class DeliveriesService {
    create(createDeliveryDto: CreateDeliveryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDeliveryDto: UpdateDeliveryDto): string;
    remove(id: number): string;
}
