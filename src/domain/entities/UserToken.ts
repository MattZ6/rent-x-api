import { User } from './User';

export type UserToken = {
  id: string;
  token: string;
  user_id: string;
  user?: User;
  expires_in: Date;
  created_at: Date;
  updated_at: Date;
};
