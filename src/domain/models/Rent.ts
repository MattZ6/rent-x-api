import { ICar } from './Car';
import { IRentPayment } from './RentPayment';
import { IUser } from './User';

export interface IRent {
  id: string;
  car_id: string;
  car: ICar;
  fine_amount: number;
  daily_rate: number;
  user_id: string;
  user: IUser;
  start_date: Date;
  expected_return_date: Date;
  return_date?: Date;
  payment_id?: string;
  payment?: IRentPayment;
  created_at: Date;
  updated_at: Date;
}
