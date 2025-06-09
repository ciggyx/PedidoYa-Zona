import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../../location/entities/location.entity';
import { DeliveryZone } from 'src/delivery-zone/entities/delivery-zone.entity';

@Entity('Zone')
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Location)
  @JoinColumn()
  location: Location;

  @OneToMany(() => DeliveryZone, dz => dz.zone)
  deliveryZones: DeliveryZone[];

  @Column()
  radius: number;

  constructor(id: number, name: string, location: Location, radius: number) {
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.location = location;
  }
}
