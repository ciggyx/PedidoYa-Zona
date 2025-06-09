import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
import { DeliveryZone } from 'src/delivery-zone/entities/delivery-zone.entity';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  address?: string;

  @Column()
  personId: string;

  @Column('double precision')
  radius: number;

  @OneToMany(() => DeliveryZone, dz => dz.delivery)
  deliveryZones: DeliveryZone[];

  @ManyToOne(() => DeliveryStatus, (deliveryStatus) => deliveryStatus.delivery, {eager: true})
  @JoinColumn({ name: 'statusId' })
  status: DeliveryStatus;

  @OneToOne(() => Location, {cascade: true, eager: true} )
  @JoinColumn()
  location: Location;

  constructor(
    id: number,
    address: string,
    personId: string,
    radius: number,
    status: DeliveryStatus,
    location: Location,
  ) {
    this.id = id;
    this.address = address;
    this.personId = personId;
    this.radius = radius;
    this.status = status;
    this.location = location;
  }
}
