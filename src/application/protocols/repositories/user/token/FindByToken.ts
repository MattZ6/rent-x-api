import { UserToken } from '@domain/entities/UserToken';

interface IFindUserTokenByTokenRepository {
  findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output>;
}

namespace IFindUserTokenByTokenRepository {
  export type Input = Pick<UserToken, 'token'> & {
    include?: {
      user?: boolean;
    };
  };

  export type Output = UserToken | null;
}

export { IFindUserTokenByTokenRepository };
