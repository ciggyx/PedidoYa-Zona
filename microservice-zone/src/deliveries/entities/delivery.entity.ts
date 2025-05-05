import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
import { Zone } from 'src/zones/entities/zone.entity';
@Entity('deliveries')
export class Delivery {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;
  
  @Column()
  personId: string;

  @Column("double precision")
  radius: number;

  @Column(()=>DeliveryStatus)
  status: DeliveryStatus;

  @Column(()=>Location)
  location: Location;

  @ManyToMany(() => Zone, zone => zone.deliveries, { eager: true })
  @JoinTable({ name: 'delivery_zones' })
  zones: Zone[];

  constructor(id:number,address:string, personId:string, radius:number, status:DeliveryStatus, location:Location, zones:Zone[]){
    this.id = id;
    this.address = address;
    this.personId = personId;
    this.radius = radius;
    this.status = status;
    this.location = location;
    this.zones = zones;
  }

}
