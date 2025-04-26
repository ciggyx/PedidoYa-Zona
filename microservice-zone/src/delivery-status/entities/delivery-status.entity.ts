import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('delivery_status')
export class DeliveryStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  constructor(id:number, name:string){
    this.id = id;
    this.name = name;
  }
}
