import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ReplaceZoneDto } from './dto/replace-zone.dto';
import { plainToInstance } from 'class-transformer';
import { ZoneResponseDto } from './dto/zone-response.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';
@Controller('zone')
@UseGuards(AuthGuard)
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  @Permissions(['createZone'])
  async create(@Body() createZoneDto: CreateZoneDto) {
    const zone = await this.zonesService.create(createZoneDto);
    return plainToInstance(ZoneResponseDto, zone, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @Permissions(['getZone'])
  findAll(
    @Query('page') page: string = '1',
    @Query('quantity') quantity: string = '10',
  ) {
    return this.zonesService.findAll(+page, +quantity);
  }

  @Get(':id')
  @Permissions(['getZone'])
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(+id);
  }

  @Put(':id')
  @Permissions(['updateZone'])
  replace(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    replaceZoneDto: ReplaceZoneDto,
  ) {
    return this.zonesService.replace(Number(id), replaceZoneDto);
  }

  @Patch(':id')
  @Permissions(['partialUpdate'])
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    updateZoneDto: UpdateZoneDto,
  ) {
    return this.zonesService.update(Number(id), updateZoneDto);
  }

  @Delete(':id')
  @Permissions(['deleteZone'])
  remove(@Param('id') id: string) {
    return this.zonesService.remove(+id);
  }
}
