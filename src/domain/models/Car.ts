import { ICarBrand } from './CarBrand';
import { ICarCategory } from './CarCategory';
import { ICarSpecification } from './CarSpecification';

export enum TypeOfFuelEnum {
  ALCOHOL = 'alcohol',
  GAS = 'gas',
  ELETRICITY = 'eletricity',
}

export enum TransmissionTypeEnum {
  MANUAL = 'manual',
  AUTO = 'auto',
}

export interface ICar {
  id: string;
  name: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  brand_id: string;
  brand: ICarBrand;
  category_id: string;
  category: ICarCategory;
  specifications: ICarSpecification[];
  type_of_fuel: TypeOfFuelEnum;
  transmission_type: TransmissionTypeEnum;
  number_of_seats: number;
  horse_power: number;
  max_speed: number;
  zero_to_one_hundred_in_millisseconds: number;
  created_at: Date;
  updated_at: Date;
}
