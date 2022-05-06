import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { prisma } from '..';

export class PrismaErrorsRepository implements ISaveErrorRepository {
  async save(
    data: ISaveErrorRepository.Input
  ): Promise<ISaveErrorRepository.Output> {
    const { stack, thrown_at, http_method, resource_uri } = data;

    return prisma.error.create({
      data: {
        stack,
        thrown_at,
        http_method,
        resource_uri,
      },
    });
  }
}
