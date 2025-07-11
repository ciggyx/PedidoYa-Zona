import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeliveryZoneService } from './delivery-zone.service';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('delivery')
@UseGuards(AuthGuard)
export class DeliveryZoneController {
  constructor(private readonly deliveryZoneService: DeliveryZoneService) {}

  @Get(':id/zones')
  @Permissions(['getDeliveryZone'])
  findZones(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.deliveryZoneService.getZonesByDeliveryId(
      id,
      Number(page),
      Number(limit),
    );
  }

  @Delete(':id/zone/:zoneId')
  @Permissions(['deleteDeliveryZone'])
  async removeZone(
    @Param('id', ParseIntPipe) deliveryId: number,
    @Param('zoneId', ParseIntPipe) zoneId: number,
  ) {
    await this.deliveryZoneService.unassignZone(deliveryId, zoneId);
    return { message: `Zone ${zoneId} unassigned from delivery ${deliveryId}` };
  }
}
