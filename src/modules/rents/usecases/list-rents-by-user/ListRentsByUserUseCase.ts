import { inject, injectable } from 'tsyringe';

import { IRentsRepository } from '@modules/rents/repositories/IRentsRepository';

type Request = {
  user_id: string;
};

@injectable()
export class ListRentsByUserUseCase {
  constructor(
    @inject('RentsRepository')
    private readonly rentsRepository: IRentsRepository
  ) {}

  async execute(data: Request) {
    const { user_id } = data;

    return this.rentsRepository.findByUserId(user_id);
  }
}
