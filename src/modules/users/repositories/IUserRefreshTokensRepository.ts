import { UserRefreshToken } from '../infra/typeorm/entities/UserRefreshToken';

export type CreateUserRefreshTokenDTO = {
  user_id: string;
  expires_in: Date;
  token: string;
};

export interface IUserRefreshTokensRepository {
  create(data: CreateUserRefreshTokenDTO): Promise<UserRefreshToken>;
}
