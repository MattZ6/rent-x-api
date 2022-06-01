import { CarCategory } from '@domain/entities/CarCategory';

export namespace CarCategoryMapper {
  type Input = CarCategory;

  export type CategoryDTO = {
    id: string;
    name: string;
    description: string;
  };

  export function toCategoryDTO(data: Input): CarCategoryMapper.CategoryDTO {
    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }

  export function toCategoriesDTO(
    data: Input[]
  ): CarCategoryMapper.CategoryDTO[] {
    return data.map(CarCategoryMapper.toCategoryDTO);
  }
}
