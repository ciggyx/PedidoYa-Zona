import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DeliveryZone } from './entities/delivery-zone.entity';
import { Delivery } from '../deliveries/entities/delivery.entity'
import { Zone } from '../zones/entities/zone.entity'
import { ZoneResponseDto } from 'src/zones/dto/zone-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DeliveryZoneService {
  constructor(
    @InjectRepository(DeliveryZone)
    private readonly deliveryZoneRepository: Repository<DeliveryZone>,
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async assignZonesToDelivery(deliveryId: number, zoneIds: number[]): Promise<void> {
    const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId } });
    if (!delivery) {
      throw new NotFoundException(`Delivery "${deliveryId}" not found`);
    }

    const zones = await this.zoneRepository.findBy({id: In(zoneIds)});
    if (zones.length !== zoneIds.length) {
      throw new NotFoundException(`One or more zones not found`);
    }

    for (const zoneId of zoneIds) {
      const exists = await this.deliveryZoneRepository.findOneBy({ deliveryId, zoneId });
      if (!exists) {
        const dz = this.deliveryZoneRepository.create({ deliveryId, zoneId });
        await this.deliveryZoneRepository.save(dz);
      }
    }
  }
  async getZonesByDeliveryId(deliveryId: number): Promise<ZoneResponseDto[]> {
  const deliveryZones = await this.deliveryZoneRepository.find({
    where: { deliveryId },
    relations: ['zone', 'zone.location'], // incluye la zona y su ubicación
  });

  const zones = deliveryZones.map(dz => dz.zone);

  return plainToInstance(ZoneResponseDto, zones, { excludeExtraneousValues: true });
}

  async unassignZone(deliveryId: number, zoneId: number): Promise<void> {
    const exists = await this.deliveryZoneRepository.findOneBy({ deliveryId, zoneId });
    if (!exists) {
      throw new NotFoundException(`Zone ${zoneId} is not assigned to delivery ${deliveryId}`);
    }

    await this.deliveryZoneRepository.delete({ deliveryId, zoneId });
  }
}