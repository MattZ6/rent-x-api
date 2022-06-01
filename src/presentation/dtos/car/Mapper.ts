import { Car, CarTypeOfFuelEnum } from '@domain/entities/Car';
import { CarBrand } from '@domain/entities/CarBrand';

import { CarBrandMapper } from './brand';

export namespace CarMapper {
  type Input = Car & {
    brand?: CarBrand;
  };

  export type CarDTO = {
    id: string;
    name: string;
    description: string;
    daily_rate: number;
    type_of_fuel: CarTypeOfFuelEnum;
    brand: CarBrandMapper.BrandDTO;
  };

  export function toListItemDTO(data: Input): CarMapper.CarDTO {
    // TODO: add image

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      daily_rate: data.daily_rate,
      type_of_fuel: data.type_of_fuel,
      brand: CarBrandMapper.toBrandDTO(data.brand),
    };
  }

  export function toListItemsDTO(data: Input[]): CarMapper.CarDTO[] {
    return data.map(CarMapper.toListItemDTO);
  }
}
