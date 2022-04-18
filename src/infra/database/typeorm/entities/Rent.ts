import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { IRent } from '@domain/entities/Rent';

import { tableNames } from '../constants';
import { Car } from './Car';
import { RentPayment } from './RentPayment';
import { User } from './User';

@Entity(tableNames.RENTS)
export class Rent implements IRent {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  car_id: string;

  @JoinColumn({ name: 'car_id' })
  @ManyToOne(() => Car)
  car: Car;

  @Column()
  daily_late_fee: number;

  @Column()
  daily_rate: number;

  @Column()
  start_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  return_date?: Date;

  @Column()
  payment_id?: string;

  @JoinColumn({ name: 'payment_id' })
  @OneToOne(() => RentPayment)
  payment?: RentPayment;

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
