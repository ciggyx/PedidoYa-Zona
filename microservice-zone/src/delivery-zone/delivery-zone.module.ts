import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliveryZone } from "./entities/delivery-zone.entity";
import { DeliveryZoneController } from "./delivery-zone.controller";
import { DeliveryZoneService } from "./delivery-zone.service";
import { Delivery } from "src/deliveries/entities/delivery.entity";
import { Zone } from "src/zones/entities/zone.entity";


@Module({
  imports: [TypeOrmModule.forFeature([DeliveryZone, Delivery, Zone])],
  controllers: [DeliveryZoneController],
  providers: [DeliveryZoneService],
})
export class DeliveryZoneModule {}
