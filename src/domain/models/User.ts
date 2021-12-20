export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  driver_license: string;
  created_at: Date;
  updated_at: Date;
}
