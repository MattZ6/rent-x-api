import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as generateUuid } from 'uuid';

import { UserRefreshToken } from './UserRefreshToken';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  avatar_file_name: string;

  @Column()
  is_admin: boolean;

  @OneToMany(() => UserRefreshToken, userRefToken => userRefToken.user)
  refresh_tokens: UserRefreshToken[];

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
