import { CarCategory } from '@domain/entities/CarCategory';

export namespace CarCategoryMapper {
  type Input = CarCategory;

  export type Brand = {
    id: string;
    name: string;
    description: string;
  };

  export function toCategoryDTO(data: Input): CarCategoryMapper.Brand {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }

  export function toCategoriesDTO(data: Input[]): CarCategoryMapper.Brand[] {
    return data.map(CarCategoryMapper.toCategoryDTO);
  }
}
