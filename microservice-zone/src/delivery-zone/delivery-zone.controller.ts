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

  @Get(':id/zones')
  async getZones(@Param('id', ParseIntPipe) id: number) {
    const zones = await this.deliveryZoneService.getZonesByDeliveryId(id);
    return zones;
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
