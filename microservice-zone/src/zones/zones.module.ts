import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { Location } from 'src/location/entities/location.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Zone, Location])],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule {}
