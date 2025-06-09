import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Zone } from 'src/zones/entities/zone.entity';
import { Delivery } from './entities/delivery.entity';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { DeliveryResponseDto } from './dto/deliveryResponse.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { FindByProximityDto } from './dto/findByProximity.dto';
import { FindByZoneDto } from './dto/findByZone.dto';
import { DeliveryWithZonesDto } from './dto/DeliveryWithZones.dto';
import { DeliveryZone } from 'src/delivery-zone/entities/delivery-zone.entity';
import { AssignZoneDto } from './dto/AssignZone.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,

    @InjectRepository(Zone)
    private readonly ZoneRepository: Repository<Zone>,

    @InjectRepository(DeliveryZone)
    private readonly DeliveryZoneRepository: Repository<DeliveryZone>,
  ) {}

  async findByZone(dto: FindByZoneDto): Promise<DeliveryWithZonesDto[]> {
    const { zoneId, page = 1, quantity = 10 } = dto;

    const deliveries = await this.deliveryRepository
      .createQueryBuilder('delivery')
      .leftJoinAndSelect('delivery.status', 'status')
      .leftJoinAndSelect('delivery.location', 'location')
      .innerJoin('delivery.deliveryZones', 'dz')
      .innerJoinAndSelect('dz.zone', 'zone')
      .where('zone.id = :zoneId', { zoneId })
      .getMany();

      const start = (page - 1) * quantity;
      const paged = deliveries.slice(start, start + quantity);

      return paged.map(del => ({
        id: del.id,
        personId: del.personId,
        location: del.location,
        radius: del.radius,
        status: del.status,
        zones: del.deliveryZones.map(dz => dz.zone),
      }))

    }

  async findByProximity(
  dto: FindByProximityDto
): Promise<DeliveryWithZonesDto[]> {
  const { lat, lng, radius, page = 1, quantity = 10 } = dto;

  const deliveries = await this.deliveryRepository
    .createQueryBuilder('delivery')
    .leftJoinAndSelect('delivery.status', 'status')
    .leftJoinAndSelect('delivery.location', 'location')         
    .innerJoin('delivery.deliveryZones', 'dz')                  
    .innerJoinAndSelect('dz.zone', 'zone')
    .getMany();

  const nearby = deliveries
    .map(delivery => ({
      delivery,
      distance: this.calculateDistance(
        lat, lng,
        delivery.location.lat,
        delivery.location.lng,
      )
    }))
    .filter(({ distance }) => distance <= radius)
    .sort((a, b) => a.distance - b.distance)
    .map(({ delivery }) => delivery);

  const start = (page - 1) * quantity;
  const paged = nearby.slice(start, start + quantity);

  const result: DeliveryWithZonesDto[] = paged.map(delivery => ({
    id: delivery.id,
    personId: delivery.personId,
    location: delivery.location,
    radius: delivery.radius,
    status: delivery.status,
    zones: delivery.deliveryZones.map(dz => dz.zone),
  }));

  return result;
}
  
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const toRad = (v: number) => (v * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async assignZones(
  deliveryId: number,
  dto: AssignZoneDto
): Promise<DeliveryWithZonesDto> {

  const delivery = await this.deliveryRepository.findOne({
    where: { id: deliveryId },
    relations: ['status', 'location'],
  });
  if (!delivery) {
    throw new NotFoundException(`Delivery con id ${deliveryId} no existe`);
  }

  const zones = await this.ZoneRepository.findBy({
    id: In(dto.zoneIds),
  });
  if (zones.length !== dto.zoneIds.length) {
    throw new NotFoundException(`Alguna zona enviada no existe`);
  }

  await this.DeliveryZoneRepository.delete({ deliveryId });

  const newLinks = dto.zoneIds.map(zoneId =>
    this.DeliveryZoneRepository.create({ deliveryId, zoneId })
  );
  await this.DeliveryZoneRepository.save(newLinks);

  const deliveryZones = await this.DeliveryZoneRepository.find({
    where: { deliveryId },
    relations: ['zone'],
  });
  const assignedZones = deliveryZones.map(dz => dz.zone);

  const dtoResult: DeliveryWithZonesDto = {
    id: delivery.id,
    personId: delivery.personId,
    location: delivery.location,
    radius: delivery.radius,
    status: delivery.status,
    zones: assignedZones,
  };

  return dtoResult;
}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const { location, statusId, ...rest } = createDeliveryDto;

    // creo la ubicacion
    const newLocation = this.locationRepository.create(location);
    await this.locationRepository.save(newLocation);

    // busco el estado o x defecto esta como disponible
    const DEFAULT_STATUS_ID = 1;
    const deliveryStatus = await this.deliveryStatusRepository.findOne({
      where: { id: createDeliveryDto.statusId ?? DEFAULT_STATUS_ID },
    });

    if (!deliveryStatus) {
      throw new NotFoundException(
        `DeliveryStatus con id "${createDeliveryDto.statusId ?? DEFAULT_STATUS_ID}" no encontrado`,
      );
    }

    // Crear y guardar el delivery
    const delivery = this.deliveryRepository.create({
      ...rest,
      location: newLocation,
      status: deliveryStatus,
    });
    // Actualización
    delivery.location.lat = location.lat;
    delivery.location.lng = location.lng;
    return await this.deliveryRepository.save(delivery);
  }

  findAll() {
    return this.deliveryRepository.find();
  }

  findOne(id: number) {
    return this.deliveryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    //await this.deliveryRepository.update(id, updateDeliveryDto);
    return this.findOne(id);
  }

  async updateLocation(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: ['location'],
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with id "${id}" not found`);
    }

    const { lat, lng } = updateLocationDto.location;

    if (delivery.location) {
      delivery.location.lat = lat;
      delivery.location.lng = lng;
      await this.locationRepository.save(delivery.location);
    } else {
      const newLocation = this.locationRepository.create({ lat, lng });
      await this.locationRepository.save(newLocation);
      delivery.location = newLocation;
    }

    return await this.deliveryRepository.save(delivery);
  }

  async updateStatus(
    id: number,
    dto: UpdateStatusDto,
  ): Promise<DeliveryResponseDto> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: ['location', 'status'],
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with id "${id}" not found`);
    }

    const newStatus = await this.deliveryStatusRepository.findOneBy({
      name: dto.status,
    });

    if (!newStatus) {
      throw new NotFoundException(
        `DeliveryStatus with name "${dto.status}" not found`,
      );
    }

    delivery.status = newStatus;
    await this.deliveryRepository.save(delivery);

    const response: DeliveryResponseDto = {
      id: delivery.id,
      personId: delivery.personId,
      radius: delivery.radius,
      location: {
        lat: delivery.location.lat,
        lng: delivery.location.lng,
      },
      status: delivery.status.name,
    };

    return response;
  }

  async remove(id: number): Promise<void> {
    const deliveryExist = await this.deliveryRepository.findOne({ where: { id } });
    if (!deliveryExist){
      throw new NotFoundException(`Delivery ${id} not found`); 
    }
    await this.deliveryRepository.delete(id);
  }

}
