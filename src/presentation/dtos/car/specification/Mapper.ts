import { CarSpecification } from '@domain/entities/CarSpecification';

export namespace CarSpecificationMapper {
  type Input = CarSpecification;

  export type SpecificationDTO = {
    id: string;
    name: string;
    description: string;
  };

  export function toSpecificationDTO(
    data: Input
  ): CarSpecificationMapper.SpecificationDTO {
    if (!data) {
      return undefined;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }

  export function toSpecificationsDTO(
    data: Input[]
  ): CarSpecificationMapper.SpecificationDTO[] {
    return data.map(CarSpecificationMapper.toSpecificationDTO);
  }
}
