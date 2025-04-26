import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("double precision")
  lat: number;
  @Column("double precision")
  lng: number;
  constructor(id:number ,lat:number ,lng:number ){
  this.id = id;
  this.lat = lat;
  this.lng = lng;
}
}
