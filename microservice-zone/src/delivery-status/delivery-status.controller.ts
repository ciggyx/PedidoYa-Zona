import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';

@Controller('delivery-status')
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Post()
  create(@Body() createDeliveryStatusDto: CreateDeliveryStatusDto) {
  return this.deliveryStatusService.create(createDeliveryStatusDto);
}


  @Get()
  findAll() {
    return this.deliveryStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDto) {
    return this.deliveryStatusService.update(+id, updateDeliveryStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryStatusService.remove(+id);
  }
}
