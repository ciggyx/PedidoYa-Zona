import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { Location } from 'src/location/entities/location.entity';
import { ReplaceZoneDto } from './dto/replace-zone.dto';
import { plainToInstance } from 'class-transformer';
import { ZoneResponseDto } from './dto/zone-response.dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone) private readonly zoneRepository: Repository<Zone>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createZoneDto: CreateZoneDto): Promise<Zone> {
    const { location, ...rest } = createZoneDto;

    // Crear y guardar la ubicación
    const newLocation = this.locationRepository.create(location);
    await this.locationRepository.save(newLocation);

    // Crear y guardar la zona
    const zone = this.zoneRepository.create({
      ...rest,
      location: newLocation,
    });
    return await this.zoneRepository.save(zone);
  }

  async findAll(page = 1, quantity = 10) {
    const skip = (page - 1) * quantity;

    const [zones] = await this.zoneRepository.findAndCount({
      relations: ['location'],
      skip,
      take: quantity,
    });

    return zones.map((zone) =>
      plainToInstance(ZoneResponseDto, zone, { excludeExtraneousValues: true }),
    );
  }

  async findOne(id: number): Promise<ZoneResponseDto> {
    const zone = await this.zoneRepository.findOne({
      where: { id },
      relations: ['location'],
    });
    return plainToInstance(ZoneResponseDto, zone, {
      excludeExtraneousValues: true,
    });
  }

  async replace(id: number, dto: ReplaceZoneDto): Promise<Zone> {
    const existingZone = await this.zoneRepository.findOne({
      where: { id },
      relations: ['location'],
    });

    if (!existingZone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }

    const newLocation = this.locationRepository.create(dto.location);
    await this.locationRepository.save(newLocation);

    existingZone.name = dto.name;
    existingZone.radius = dto.radius;
    existingZone.location = newLocation;

    return await this.zoneRepository.save(existingZone);
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

  async remove(id: number): Promise<{ message: string }> {
    const zone = await this.zoneRepository.findOne({ where: { id } });

    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }

    await this.zoneRepository.remove(zone);

    return {
      message: 'Zone deleted',
    };
  }
}
