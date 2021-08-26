import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  CreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

export class InMemorySpecificationsRepository
  implements ISpecificationsRepository
{
  private specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(spec =>
      spec.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async create(data: CreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    } as Specification);

    this.specifications.push(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(spec => ids.includes(spec.id));
  }
}
