import { Delivery } from 'src/deliveries/entities/delivery.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('delivery_status')
export class DeliveryStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Delivery, (delivery) => delivery.status)
  delivery: Delivery[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
