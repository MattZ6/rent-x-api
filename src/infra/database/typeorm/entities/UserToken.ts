import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { IUserToken } from '@domain/entities/UserToken';

import { tableNames } from '../constants';

@Entity(tableNames.USER_TOKENS)
export class UserToken implements IUserToken {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  token: string;

  @Column()
  user_id: string;

  @Column()
  expires_in: Date;

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
