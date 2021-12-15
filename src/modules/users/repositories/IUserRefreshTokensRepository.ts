import { UserRefreshToken } from '../infra/typeorm/entities/UserRefreshToken';

export type CreateUserRefreshTokenDTO = {
  user_id: string;
  expires_in: Date;
  token: string;
};

export type FindByTokenFromUser = {
  user_id: string;
  token: string;
};

export interface IUserRefreshTokensRepository {
  create(data: CreateUserRefreshTokenDTO): Promise<UserRefreshToken>;
  findByTokenFromUser(
    data: FindByTokenFromUser
  ): Promise<UserRefreshToken | undefined>;
  findByToken(token: string): Promise<UserRefreshToken | undefined>;
  deleteById(id: string): Promise<void>;
}
