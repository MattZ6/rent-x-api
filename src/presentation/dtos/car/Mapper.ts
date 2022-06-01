import {
  Car,
  CarTypeOfFuelEnum,
  CarTransmissionTypeEnum,
} from '@domain/entities/Car';
import { CarBrand } from '@domain/entities/CarBrand';
import { CarCategory } from '@domain/entities/CarCategory';
import { CarImage } from '@domain/entities/CarImage';

import { CarBrandMapper } from './brand';
import { CarCategoryMapper } from './category';

export namespace CarMapper {
  type Input = Car & {
    brand?: CarBrand;
    category?: CarCategory;
    images?: CarImage[];
  };

  export type CarListItemDTO = {
    id: string;
    name: string;
    description: string;
    daily_rate: number;
    type_of_fuel: CarTypeOfFuelEnum;
    brand: CarBrandMapper.BrandDTO;
  };

  export type CarDetailsDTO = CarMapper.CarListItemDTO & {
    transmission_type: CarTransmissionTypeEnum;
    max_speed: number;
    zero_to_one_hundred_in_millisseconds: number;
    number_of_seats: number;
    horse_power: number;
    category: CarCategoryMapper.CategoryDTO;
  };

  export function toListItemDTO(data: Input): CarMapper.CarListItemDTO {
    if (!data) {
      return undefined;
    }

    // TODO: add cover image

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      daily_rate: data.daily_rate,
      type_of_fuel: data.type_of_fuel,
      brand: CarBrandMapper.toBrandDTO(data.brand),
    };
  }

  export function toListItemsDTO(data: Input[]): CarMapper.CarListItemDTO[] {
    return data.map(CarMapper.toListItemDTO);
  }

  export function toDetailsDTO(data: Input): CarMapper.CarDetailsDTO {
    const details = CarMapper.toListItemDTO(data);

    // TODO: add images

    return {
      ...details,
      transmission_type: data.transmission_type,
      max_speed: data.max_speed,
      zero_to_one_hundred_in_millisseconds:
        data.zero_to_one_hundred_in_millisseconds,
      number_of_seats: data.number_of_seats,
      horse_power: data.horse_power,
      category: CarCategoryMapper.toCategoryDTO(data.category),
    };
  }
}
