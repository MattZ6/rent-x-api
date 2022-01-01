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

import { ICar } from '@domain/models/Car';
import { ICarBrand } from '@domain/models/CarBrand';
import { ICarCategory } from '@domain/models/CarCategory';
import { ICarSpecification } from '@domain/models/CarSpecification';

import { tableNames } from '../constants';
import { CarBrand } from './CarBrand';
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
  @ManyToOne(() => CarBrand)
  category: ICarCategory;

  @ManyToMany(() => CarSpecification)
  @JoinTable({
    name: tableNames.CARS_SPECIFICATIONS,
    joinColumn: { name: 'car_id' },
    inverseJoinColumn: { name: 'specification_id' },
  })
  specifications: ICarSpecification[];

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