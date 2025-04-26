import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZonesModule } from './zones/zones.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [ZonesModule, DeliveriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
