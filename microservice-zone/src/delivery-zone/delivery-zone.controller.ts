import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DeliveryZoneService } from './delivery-zone.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

@Controller('delivery')
@UseGuards(AuthGuard)
export class DeliveryZoneController {
  constructor(private readonly deliveryZoneService: DeliveryZoneService) {}

  @Get(':id/zones')
  @Permissions(['getZone'])
  findZones(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryZoneService.getZonesByDeliveryId(id);
  }

  @Delete(':id/zone/:zoneId')
  @Permissions(['deleteZone'])
  async removeZone(
    @Param('id', ParseIntPipe) deliveryId: number,
    @Param('zoneId', ParseIntPipe) zoneId: number,
  ) {
    await this.deliveryZoneService.unassignZone(deliveryId, zoneId);
    return { message: `Zone ${zoneId} unassigned from delivery ${deliveryId}` };
  }
}
