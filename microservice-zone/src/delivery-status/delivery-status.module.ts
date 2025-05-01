import { Module } from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { DeliveryStatusController } from './delivery-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryStatus } from './entities/delivery-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryStatus])],
  controllers: [DeliveryStatusController],
  providers: [DeliveryStatusService],
})
export class DeliveryStatusModule {}
