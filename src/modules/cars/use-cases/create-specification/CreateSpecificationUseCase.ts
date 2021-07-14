import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

type Request = {
  name: string;
  description: string;
};

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: Request): void {
    const specification = this.specificationsRepository.findByName(name);

    if (specification) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({ name, description });
  }
}
