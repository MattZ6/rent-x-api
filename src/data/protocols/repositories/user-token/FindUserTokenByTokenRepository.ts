import { IUserToken } from '@domain/models/UserToken';

interface IFindUserTokenByTokenRepository {
  findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output>;
}

namespace IFindUserTokenByTokenRepository {
  export type Input = {
    token: string;
  };

  export type Output = IUserToken | undefined;
}

export { IFindUserTokenByTokenRepository };
