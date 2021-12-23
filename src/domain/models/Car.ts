import { ICarBrand } from './CarBrand';
import { ICarCategory } from './CarCategory';
import { ICarSpecification } from './CarSpecification';

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
  created_at: Date;
  updated_at: Date;
}
