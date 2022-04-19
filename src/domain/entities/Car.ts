export type CarTypeOfFuelEnum = 'ALCOHOL' | 'GAS' | 'ELETRICITY';

export type CarTransmissionTypeEnum = 'MANUAL' | 'AUTO';

export type Car = {
  id: string;
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  daily_late_fee: number;
  brand_id: string;
  category_id: string;
  type_of_fuel: CarTypeOfFuelEnum;
  transmission_type: CarTransmissionTypeEnum;
  number_of_seats: number;
  horse_power: number;
  max_speed: number;
  zero_to_one_hundred_in_millisseconds: number;
  created_at: Date;
  updated_at: Date;
};
