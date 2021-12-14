import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import { User } from './User';

@Entity('user_refresh_tokens')
export class UserRefreshToken {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  token: string;

  @Column()
  expires_in: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = generateUuid();
    }
  }
}
