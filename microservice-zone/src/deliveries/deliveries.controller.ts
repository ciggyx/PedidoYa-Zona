import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deliveriesService.remove(+id);
  }
}
