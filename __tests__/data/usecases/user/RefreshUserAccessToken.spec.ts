import faker from 'faker';

import {
  TokenExpiredError,
  TokenNotFoundWithThisTokenFromUserError,
} from '@domain/errors';

import { RefreshUserAccessTokenUseCase } from '@data/usecases/user/RefreshUserAccessToken';

import { userTokenMock } from '../../../domain/models/user-token.mock';
import {
  CreateUserTokenRepositorySpy,
  DeleteUserTokenByIdRepositorySpy,
  EncryptProviderSpy,
  FindUserTokenByTokenFromUserRepositorySpy,
  GenerateUuidProviderSpy,
} from '../../mocks';

let findUserTokenByTokenFromUserRepositorySpy: FindUserTokenByTokenFromUserRepositorySpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
const refreshTokenExpiresTimeInMillisseconds = 1 * 24 * 60 * 60 * 1000;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
let deleteUserTokenByIdRepositorySpy: DeleteUserTokenByIdRepositorySpy;

let refreshUserAccessTokenUseCase: RefreshUserAccessTokenUseCase;

describe('RefreshUserAccessTokenUseCase', () => {
  beforeEach(() => {
    findUserTokenByTokenFromUserRepositorySpy =
      new FindUserTokenByTokenFromUserRepositorySpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();
    deleteUserTokenByIdRepositorySpy = new DeleteUserTokenByIdRepositorySpy();

    refreshUserAccessTokenUseCase = new RefreshUserAccessTokenUseCase(
      findUserTokenByTokenFromUserRepositorySpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      refreshTokenExpiresTimeInMillisseconds,
      createUserTokenRepositorySpy,
      deleteUserTokenByIdRepositorySpy
    );
  });

  it('should call FindUserTokenByTokenFromUserRepository once with correct values', async () => {
    const findByTokenFromUserSpy = jest.spyOn(
      findUserTokenByTokenFromUserRepositorySpy,
      'findByTokenFromUser'
    );

    const refreshToken = faker.datatype.uuid();
    const userId = faker.datatype.uuid();

    await refreshUserAccessTokenUseCase.execute({
      refresh_token: refreshToken,
      user_id: userId,
    });

    expect(findByTokenFromUserSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenFromUserSpy).toHaveBeenCalledWith({
      user_id: userId,
      token: refreshToken,
    });
  });

  it('should throw if FindUserTokenByTokenFromUserRepository throws', async () => {
    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute({
      refresh_token: faker.datatype.uuid(),
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw TokenNotFoundWithThisTokenFromUserError if token does not exist', async () => {
    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce(undefined);

    const response = refreshUserAccessTokenUseCase.execute({
      refresh_token: faker.datatype.uuid(),
      user_id: faker.datatype.uuid(),
    });

    await expect(response).rejects.toBeInstanceOf(
      TokenNotFoundWithThisTokenFromUserError
    );
  });

  it('should throw TokenExpiredError if token has expired', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime() + 1);

    const promise = refreshUserAccessTokenUseCase.execute({
      refresh_token: faker.datatype.uuid(),
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toBeInstanceOf(TokenExpiredError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const userId = faker.datatype.uuid();

    await refreshUserAccessTokenUseCase.execute({
      user_id: userId,
      refresh_token: faker.datatype.uuid(),
    });

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      value: userId,
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateUuidProvider once', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    await refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserTokenRepository with correct values', async () => {
    const tokenExpiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({
        ...userTokenMock,
        expires_in: tokenExpiresInDate,
      });

    const now = faker.datatype.datetime();

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(tokenExpiresInDate.getTime())
      .mockReturnValueOnce(now.getTime());

    const token = faker.datatype.uuid();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    const userId = faker.datatype.uuid();

    await refreshUserAccessTokenUseCase.execute({
      user_id: userId,
      refresh_token: faker.datatype.uuid(),
    });

    const expiresIn = new Date(
      now.getTime() + refreshTokenExpiresTimeInMillisseconds
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userId,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call DeleteUserTokenByIdRepositorySpy with correct values', async () => {
    const expiresInDate = faker.datatype.datetime();
    const userTokenId = faker.datatype.uuid();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({
        ...userTokenMock,
        expires_in: expiresInDate,
        id: userTokenId,
      });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    const deleteByIdSpy = jest.spyOn(
      deleteUserTokenByIdRepositorySpy,
      'deleteById'
    );

    await refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith(userTokenId);
  });

  it('should throw if DeleteUserTokenByIdRepositorySpy throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(deleteUserTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    expect(promise).rejects.toThrow();
  });

  it('should return access token and refresh token on success', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenFromUserRepositorySpy, 'findByTokenFromUser')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    const accessToken = faker.datatype.string();
    const refreshToken = faker.datatype.uuid();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);
    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(refreshToken);

    const response = await refreshUserAccessTokenUseCase.execute({
      user_id: faker.datatype.uuid(),
      refresh_token: faker.datatype.uuid(),
    });

    expect(response).toEqual({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  });
});
