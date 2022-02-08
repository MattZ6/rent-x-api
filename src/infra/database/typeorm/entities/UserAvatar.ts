import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IUser } from '@domain/models/User';
import { IUserAvatar } from '@domain/models/UserAvatar';

import { tableNames } from '../constants';
import { User } from './User';

@Entity(tableNames.USER_AVATARS)
export class UserAvatar implements IUserAvatar {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, { primary: true })
  user: IUser;

  @Column()
  original_name: string;

  @Column()
  mime_type: string;

  @Column()
  extension: string;

  @Column()
  size_in_bytes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
