import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import { Car } from './Car';

@Entity('specifications')
export class Specification {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Car)
  @JoinTable({
    name: 'cars_specifications',
    joinColumns: [{ name: 'specification_id' }],
    inverseJoinColumns: [{ name: 'car_id' }],
  })
  cars: Car[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = generateUuid();
    }
  }
}
