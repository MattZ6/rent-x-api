import { Specification } from '../models/Specification';
import {
  CreateSpecificationDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(
      x => x.name.toLowerCase() === name.toLowerCase()
    );
  }

  create({ name, description }: CreateSpecificationDTO): void {
    const specification = new Specification({ name, description });

    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }
}
