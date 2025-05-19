import { Module } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { DeliveryStatusController } from './delivery-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryStatus } from './entities/delivery-status.entity';
import { DeliveryStatusSeed } from './delivery-status.seed';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryStatus])],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService, DeliveryStatusSeed],
})
export class DeliveryStatusModule {}
