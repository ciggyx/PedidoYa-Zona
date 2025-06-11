import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Location } from 'src/location/entities/location.entity';
import { Zone } from 'src/zones/entities/zone.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
import { DeliveryZone } from 'src/delivery-zone/entities/delivery-zone.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Delivery,
      Location,
      DeliveryStatus,
      Zone,
      DeliveryZone,
    ]),
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
