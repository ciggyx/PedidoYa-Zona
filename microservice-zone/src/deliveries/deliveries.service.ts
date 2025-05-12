import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { DeliveryResponseDto } from './dto/deliveryResponse.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

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
    await this.deliveryRepository.delete(id);
  }
}
