import { Expose } from 'class-transformer';
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

  @Expose({ name: 'avatar_url' })
  get avatar_url(): string {
    if (!this.avatar_file_name) {
      return null;
    }

    switch (process.env.STORAGE) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar_file_name}`;

      case 's3':
        return `${process.env.AWS_S3_BUCKET_URL}/avatar/${this.avatar_file_name}`;

      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = generateUuid();
    }
  }
}
