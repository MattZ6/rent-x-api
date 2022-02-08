import { IRent } from './Rent';

export interface IRentPayment {
  id: string;
  rent_id: string;
  rent: IRent;
  total: number;
  paid_at?: Date;
  created_at: Date;
  updated_at: Date;
}
