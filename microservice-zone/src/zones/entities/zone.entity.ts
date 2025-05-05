import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Location} from '../../location/entities/location.entity';
import { Delivery } from 'src/deliveries/entities/delivery.entity';

@Entity('Zone')
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column(()=>Location)
  location: Location;
  
  @Column()
  radius: number;

  @ManyToMany(() => Delivery, delivery => delivery.zones)
  deliveries: Delivery[];

  constructor(id: number, name: string, location:Location, radius: number) {
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.location = location;
  }
}
