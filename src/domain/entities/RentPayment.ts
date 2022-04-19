export type RentPayment = {
  id: string;
  rent_id: string;
  total: number;
  paid_at?: Date;
  created_at: Date;
  updated_at: Date;
};
