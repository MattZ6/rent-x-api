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

import { IUser } from '@domain/models/User';
import { IUserAvatar } from '@domain/models/UserAvatar';

import { tableNames } from '../constants';
import { UserAvatar } from './UserAvatar';

@Entity(tableNames.USERS)
export class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  driver_license: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'id' })
  @OneToOne(() => UserAvatar)
  avatar?: IUserAvatar;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
