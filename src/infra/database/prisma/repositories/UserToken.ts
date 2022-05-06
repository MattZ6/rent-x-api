import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@application/protocols/repositories/user';

import { prisma } from '..';

export class PrismaUserTokensRepository
  implements
    ICreateUserTokenRepository,
    IFindUserTokenByTokenRepository,
    IDeleteUserTokenByIdRepository
{
  async create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output> {
    const { user_id, token, expires_in } = data;

    const userToken = await prisma.userToken.create({
      data: {
        user_id,
        token,
        expires_in,
      },
    });

    return userToken;
  }

  async findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output> {
    const { token, include } = data;

    const userToken = await prisma.userToken.findUnique({
      where: { token },
      include,
    });

    return userToken;
  }

  async deleteById(
    data: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output> {
    const { id } = data;

    await prisma.userToken.delete({
      where: { id },
    });
  }
}
