import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone) private readonly zoneRepository: Repository<Zone>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  create(createZoneDto: CreateZoneDto) {
    return 'This action adds a new zone';
  }

  async findAll() {
    return await this.zoneRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} zone`;
  }

  async update(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({
      where: { id },
      relations: ['location'],
    });

    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }

    if (updateZoneDto.name !== undefined) zone.name = updateZoneDto.name;
    if (updateZoneDto.radius !== undefined) zone.radius = updateZoneDto.radius;

    if (updateZoneDto.location) {
      const newLocation = this.locationRepository.create(
        updateZoneDto.location,
      );
      await this.locationRepository.save(newLocation);
      zone.location = newLocation;
    }

    return await this.zoneRepository.save(zone);
  }

  async remove(id: number): Promise<void> {
    const zone = await this.zoneRepository.findOne({ where: { id } });

    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }

    await this.zoneRepository.remove(zone);
  }
}
