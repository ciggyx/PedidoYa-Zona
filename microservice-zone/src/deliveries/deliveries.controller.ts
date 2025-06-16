import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { FindByProximityDto } from './dto/findByProximity.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { Delivery } from './entities/delivery.entity';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { DeliveryResponseDto } from './dto/deliveryResponse.dto';
import { DeliveryWithZonesDto } from './dto/DeliveryWithZones.dto';
import { FindByZoneDto } from './dto/findByZone.dto';
import { AssignZoneDto } from './dto/AssignZone.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('deliveries')
@UseGuards(AuthGuard)
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @Permissions(['createDelivery'])
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }
  @Get('findByProximity')
  @Permissions(['getDeliveryFindByProximity'])
  findByProximity(
    @Query() dto: FindByProximityDto,
  ): Promise<DeliveryWithZonesDto[]> {
    return this.deliveriesService.findByProximity(dto);
  }

  @Get('findByZone')
  @Permissions(['getDeliveryByZone'])
  findByZone(@Query() dto: FindByZoneDto): Promise<DeliveryWithZonesDto[]> {
    return this.deliveriesService.findByZone(dto);
  }

  @Post(':id/assignZone')
  @Permissions(['assignZone'])
  assignZone(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignZoneDto,
  ): Promise<DeliveryWithZonesDto> {
    return this.deliveriesService.assignZones(id, dto);
  }

  @Get()
  @Permissions(['getDeliveries'])
  findAll() {
    return this.deliveriesService.findAll();
  }
  //Cambio el tipo de dato del id a number para luego poder validarlo con Class validator.
  //Nos va a servir para validar todos los datos de entrada que tengamos
  @Get(':id')
  @Permissions(['getDelivery'])
  findOne(@Param('id') id: number) {
    return this.deliveriesService.findOne(+id);
  }
  @Put(':id/location')
  @Permissions(['updateDeliveryLocation'])
  async updateLocation(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Delivery> {
    return this.deliveriesService.updateLocation(id, updateLocationDto);
  }

  @Put(':id/status')
  @Permissions(['updateDeliveryStatus'])
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Promise<DeliveryResponseDto> {
    return this.deliveriesService.updateStatus(id, dto);
  }

  @Patch(':id')
  @Permissions(['updateDelivery'])
  update(
    @Param('id') id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  @Permissions(['deleteDelivery'])
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deliveriesService.remove(id);
    return { message: `Delivery ${id} deleted` };
  }
}
