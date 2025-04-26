import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonesModule } from './zones/zones.module';
import { DeliveryStatusModule } from './delivery-status/delivery-status.module';
import { LocationModule } from './location/location.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'examplepassword',
    database: "users",
    autoLoadEntities: true,
    synchronize: true,
    }),
    ZonesModule,
    DeliveryStatusModule,
    LocationModule, 
    DeliveriesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
