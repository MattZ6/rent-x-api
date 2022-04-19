export type Rent = {
  id: string;
  car_id: string;
  daily_late_fee: number;
  daily_rate: number;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
  return_date?: Date;
  payment_id?: string;
  created_at: Date;
  updated_at: Date;
};
