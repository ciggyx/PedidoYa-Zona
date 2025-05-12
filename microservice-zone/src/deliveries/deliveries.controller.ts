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
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';
import { Delivery } from './entities/delivery.entity';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { DeliveryResponseDto } from './dto/deliveryResponse.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }
  //Cambio el tipo de dato del id a number para luego poder validarlo con Class validator.
  //Nos va a servir para validar todos los datos de entrada que tengamos
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.deliveriesService.findOne(+id);
  }
  @Put(':id/location')
  async updateLocation(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Delivery> {
    return this.deliveriesService.updateLocation(id, updateLocationDto);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Promise<DeliveryResponseDto> {
    return this.deliveriesService.updateStatus(id, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deliveriesService.remove(+id);
  }
}
