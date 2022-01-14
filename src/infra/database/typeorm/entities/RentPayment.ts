import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { IRentPayment } from '@domain/models/RentPayment';

import { tableNames } from '../constants';
import { Rent } from './Rent';

@Entity(tableNames.RENT_PAYMENTS)
export class RentPayment implements IRentPayment {
  @PrimaryColumn()
  id: string;

  @Column()
  rent_id: string;

  @JoinColumn({ name: 'rent_id' })
  @OneToOne(() => Rent)
  rent: Rent;

  @Column()
  total: number;

  @Column()
  paid_at?: Date;

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
