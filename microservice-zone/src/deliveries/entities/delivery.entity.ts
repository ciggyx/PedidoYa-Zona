import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { DeliveryStatus } from 'src/delivery-status/entities/delivery-status.entity';
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

  constructor(id:number,address:string, personId:string, radius:number, status:DeliveryStatus, location:Location){
    this.id = id;
    this.address = address;
    this.personId = personId;
    this.radius = radius;
    this.status = status;
    this.location = location;
  }





}
