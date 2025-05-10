import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';

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
    const { location, status, ...rest } = createDeliveryDto;

    // creo la ubicacion
    const newLocation = this.locationRepository.create(location);
    await this.locationRepository.save(newLocation);

    // busco el estado o x defecto esta como disponible
    const deliveryStatus = await this.deliveryStatusRepository.findOne({
      where: { name: status ?? 'available' },
    });

    if (!deliveryStatus) {
      throw new NotFoundException(`DeliveryStatus "${status ?? 'available'}" no encontrado`);
    }

    // Crear y guardar el delivery
    const delivery = this.deliveryRepository.create({
      ...rest,
      location: newLocation,
      status: deliveryStatus,
    });

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

  async remove(id: number): Promise<void> {
    const deliveryExist = await this.deliveryRepository.findOne({ where: { id } });
    if (!deliveryExist){
      throw new NotFoundException(`Delivery ${id} not found`); 
    }
    await this.deliveryRepository.delete(id);
  }
}

