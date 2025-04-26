import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Location} from '../../location/entities/location.entity';

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

  constructor(id: number, name: string, location:Location, radius: number) {
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.location = location;
  }
}
