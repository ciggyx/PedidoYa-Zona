import { Injectable } from '@nestjs/common';
import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';

@Injectable()
export class DeliveryStatusService {
  create(createDeliveryStatusDto: CreateDeliveryStatusDto) {
    return 'This action adds a new deliveryStatus';
  }

  findAll() {
    return `This action returns all deliveryStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryStatus`;
  }

  update(id: number, updateDeliveryStatusDto: UpdateDeliveryStatusDto) {
    return `This action updates a #${id} deliveryStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryStatus`;
  }
}
