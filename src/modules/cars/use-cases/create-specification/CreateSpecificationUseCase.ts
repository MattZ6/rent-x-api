import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

type Request = {
  name: string;
  description: string;
};

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: Request): Promise<void> {
    const specification = this.specificationsRepository.findByName(name);

    if (specification) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({ name, description });
  }
}
