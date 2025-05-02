import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone) private readonly zoneRepository: Repository<Zone>,
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

  update(id: number) {
    return `Butaso el que lee`;
  }

  async remove(id: number): Promise<void> {
    const zone = await this.zoneRepository.findOne({ where: { id } });

    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }

    await this.zoneRepository.remove(zone);
  }
}
