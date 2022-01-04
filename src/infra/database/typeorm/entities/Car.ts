import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { ICar, TransmissionTypeEnum, TypeOfFuelEnum } from '@domain/models/Car';
import { ICarBrand } from '@domain/models/CarBrand';
import { ICarCategory } from '@domain/models/CarCategory';
import { ICarSpecification } from '@domain/models/CarSpecification';

import { tableNames } from '../constants';
import { CarBrand } from './CarBrand';
import { CarCategory } from './CarCategory';
import { CarSpecification } from './CarSpecification';

@Entity(tableNames.CARS)
export class Car implements ICar {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @Column()
  brand_id: string;

  @JoinColumn({ name: 'brand_id' })
  @ManyToOne(() => CarBrand)
  brand: ICarBrand;

  @Column()
  category_id: string;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => CarCategory)
  category: ICarCategory;

  @ManyToMany(() => CarSpecification)
  @JoinTable({
    name: tableNames.CARS_SPECIFICATIONS,
    joinColumn: { name: 'car_id' },
    inverseJoinColumn: { name: 'specification_id' },
  })
  specifications: ICarSpecification[];

  @Column({ type: 'enum', enum: TypeOfFuelEnum })
  type_of_fuel: TypeOfFuelEnum;

  @Column({ type: 'enum', enum: TransmissionTypeEnum })
  transmission_type: TransmissionTypeEnum;

  @Column()
  number_of_seats: number;

  @Column()
  horse_power: number;

  @Column()
  max_speed: number;

  @Column()
  zero_to_one_hundred_in_millisseconds: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
