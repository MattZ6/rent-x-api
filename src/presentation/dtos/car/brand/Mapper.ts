import { CarBrand } from '@domain/entities/CarBrand';

export namespace CarBrandMapper {
  type Input = CarBrand;

  export type Brand = {
    id: string;
    name: string;
  };

  export function toBrandDTO(data: Input): CarBrandMapper.Brand {
    return {
      id: data.id,
      name: data.name,
    };
  }

  export function toBrandsDTO(data: Input[]): CarBrandMapper.Brand[] {
    return data.map(CarBrandMapper.toBrandDTO);
  }
}
