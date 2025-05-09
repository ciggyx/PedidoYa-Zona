import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryStatus } from './entities/delivery-status.entity';

@Injectable()
export class DeliveryStatusSeed {
  constructor(
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

  async run() {
    const statuses = ['available', 'in_route'];

    for (const status of statuses) {
      const existingStatus = await this.deliveryStatusRepository.findOne({ where: { name: status } });
      if (!existingStatus) {
        await this.deliveryStatusRepository.save({ name: status });
      }
    }
  }
}
