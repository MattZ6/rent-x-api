import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
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
    const specification = await this.specificationsRepository.findByName(name);

    if (specification) {
      throw new AppError('Specification already exists', 422);
    }

    this.specificationsRepository.create({ name, description });
  }
}
