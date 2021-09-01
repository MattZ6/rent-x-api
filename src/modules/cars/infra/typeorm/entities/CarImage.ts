import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as generateUuid } from 'uuid';

@Entity('car_images')
export class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  mime_type: string;

  @Column()
  car_id: string;

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
