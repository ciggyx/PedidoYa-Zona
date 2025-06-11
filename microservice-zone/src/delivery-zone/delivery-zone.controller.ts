import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { DeliveryZoneService } from './delivery-zone.service';

@Controller('delivery')
export class DeliveryZoneController {
  constructor(private readonly deliveryZoneService: DeliveryZoneService) {}

  @Get(':id/zones')
  findZones(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
  return this.deliveryZoneService.getZonesByDeliveryId(id, Number(page), Number(limit));
  }


  @Delete(':id/zone/:zoneId')
  async removeZone(
    @Param('id', ParseIntPipe) deliveryId: number,
    @Param('zoneId', ParseIntPipe) zoneId: number,
  ) {
    await this.deliveryZoneService.unassignZone(deliveryId, zoneId);
      return { message: `Zone ${zoneId} unassigned from delivery ${deliveryId}` };
  }
}
