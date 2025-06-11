import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DeliveryZone } from './entities/delivery-zone.entity';
import { ZoneResponseDto } from 'src/zones/dto/zone-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationResultDto } from './dto/paginacion-delivery-zone.dto';

@Injectable()
export class DeliveryZoneService {
  constructor(
    @InjectRepository(DeliveryZone)
    private readonly deliveryZoneRepository: Repository<DeliveryZone>,
  ) {}

async getZonesByDeliveryId(deliveryId: number, page = 1, limit = 10,): Promise<PaginationResultDto<ZoneResponseDto>> {
  const [deliveryZones, total] = await this.deliveryZoneRepository.findAndCount({
    where: { deliveryId },
    relations: ['zone', 'zone.location'],
    skip: (page - 1) * limit,
    take: limit,
  });

  const zones = deliveryZones.map(dz => dz.zone);

  return {zones: plainToInstance(ZoneResponseDto, zones, { excludeExtraneousValues: true }), total, page,
  };

}

  async unassignZone(deliveryId: number, zoneId: number): Promise<void> {
    const exists = await this.deliveryZoneRepository.findOneBy({ deliveryId, zoneId });
    if (!exists) {
      throw new NotFoundException(`Zone ${zoneId} is not assigned to delivery ${deliveryId}`);
    }

    await this.deliveryZoneRepository.delete({ deliveryId, zoneId });
  }
}