import { Specification } from '../entities/Specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface ISpecificationsRepository {
  findByName(name: string): Specification | undefined;
  list(): Specification[];
  create(data: CreateSpecificationDTO): void;
}
