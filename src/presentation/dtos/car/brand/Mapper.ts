import { CarBrand } from '@domain/entities/CarBrand';

export namespace CarBrandMapper {
  type Input = CarBrand;

  export type BrandDTO = {
    id: string;
    name: string;
  };

  export function toBrandDTO(data: Input): CarBrandMapper.BrandDTO {
    if (!data) {
      return undefined;
    }

    return {
      id: data.id,
      name: data.name,
    };
  }

  export function toBrandsDTO(data: Input[]): CarBrandMapper.BrandDTO[] {
    return data.map(CarBrandMapper.toBrandDTO);
  }
}
