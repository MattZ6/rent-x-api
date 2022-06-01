import { CarSpecification } from '@domain/entities/CarSpecification';

export namespace CarSpecificationMapper {
  type Input = CarSpecification;

  export type Brand = {
    id: string;
    name: string;
    description: string;
  };

  export function toSpecificationDTO(
    data: Input
  ): CarSpecificationMapper.Brand {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }

  export function toSpecificationsDTO(
    data: Input[]
  ): CarSpecificationMapper.Brand[] {
    return data.map(CarSpecificationMapper.toSpecificationDTO);
  }
}
