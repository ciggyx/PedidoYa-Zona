import { Injectable } from '@nestjs/common';
import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryStatus } from './entities/delivery-status.entity';


@Injectable()
export class DeliveryStatusService {
  constructor(
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>
  ) {}
  
  async create(createDeliveryStatusDto: CreateDeliveryStatusDto): Promise<DeliveryStatus> {
  const newStatus = this.deliveryStatusRepository.create(createDeliveryStatusDto);
  return await this.deliveryStatusRepository.save(newStatus);
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
