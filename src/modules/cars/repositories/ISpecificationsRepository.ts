import { Specification } from '../infra/typeorm/entities/Specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>;
  list(): Promise<Specification[]>;
  create(data: CreateSpecificationDTO): Promise<void>;
}
