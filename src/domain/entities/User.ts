export type UserRole = 'ADMIN' | 'DRIVER';

export type User = {
  id: string;
  name: string;
  driver_license: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
};
