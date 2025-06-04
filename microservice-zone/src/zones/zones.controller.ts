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
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  async create(@Body() createZoneDto: CreateZoneDto) {
    const zone = await this.zonesService.create(createZoneDto);
    return plainToInstance(ZoneResponseDto, zone, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('quantity') quantity: string = '10',
  ) {
    return this.zonesService.findAll(+page, +quantity);
  }

  @UseGuards(AuthGuard)
  @Permissions(['test'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(+id);
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    replaceZoneDto: ReplaceZoneDto,
  ) {
    return this.zonesService.replace(Number(id), replaceZoneDto);
  }

  // Updatea parcialmente !!
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    updateZoneDto: UpdateZoneDto,
  ) {
    return this.zonesService.update(Number(id), updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zonesService.remove(+id);
  }
}
