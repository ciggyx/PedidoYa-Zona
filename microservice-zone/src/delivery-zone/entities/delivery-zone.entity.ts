import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Delivery } from '../../deliveries/entities/delivery.entity';
import { Zone } from '../../zones/entities/zone.entity';

@Entity('delivery_zone')
export class DeliveryZone {
@PrimaryColumn()
deliveryId: number;

@PrimaryColumn()
zoneId: number;

@ManyToOne(() => Delivery, delivery => delivery.id)
@JoinColumn({ name: 'deliveryId' })
delivery: Delivery;

@ManyToOne(() => Zone, zone => zone.id)
@JoinColumn({ name: 'zoneId' })
zone: Zone;
}