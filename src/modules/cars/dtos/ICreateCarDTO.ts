export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  daily_late_fee: number;
  brand: string;
  category_id: string;
  is_available: boolean;
}
