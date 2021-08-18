import { getRepository, Repository } from 'typeorm';

import { Specification } from '@modules/cars/entities/Specification';

import {
  CreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({ name });
  }

  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }
}
