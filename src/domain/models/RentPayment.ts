import { ICar } from './Car';

export interface IRentPayment {
  car_id: string;
  car: ICar;
  total: number;
  paid_at?: Date;
  created_at: Date;
  updated_at: Date;
}
