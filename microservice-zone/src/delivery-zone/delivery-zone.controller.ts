import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DeliveryZoneService } from './delivery-zone.service';
import { CreateDeliveryZones } from './dto/delivery-zone.dto';

@Controller('delivery')
export class DeliveryZoneController {
  constructor(private readonly deliveryZoneService: DeliveryZoneService) {}

  @Post(':id/assignZone')
  async assign(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateDeliveryZones,
  ) {
    await this.deliveryZoneService.assignZonesToDelivery(id, body.zoneIds);
    return { message: 'Zones assigned successfully' };
  }
}
