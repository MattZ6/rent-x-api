import { faker } from '@faker-js/faker';

import {
  UserTokenExpiredError,
  UserTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshUserAccessToken';

import { userTokenMock } from '../../../domain/models/user/user-token.mock';
import {
  CreateUserTokenRepositorySpy,
  DeleteUserTokenByIdRepositorySpy,
  EncryptProviderSpy,
  FindUserTokenByTokenRepositorySpy,
  GenerateUuidProviderSpy,
  refreshTokenExpiresTimeInMillissecondsMock,
  refreshUserAccessTokenUseCaseInputMock,
} from '../../mocks';

let findUserTokenByTokenRepositorySpy: FindUserTokenByTokenRepositorySpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
let deleteUserTokenByIdRepositorySpy: DeleteUserTokenByIdRepositorySpy;

let refreshUserAccessTokenUseCase: RefreshUserAccessTokenUseCase;

describe('RefreshUserAccessTokenUseCase', () => {
  beforeEach(() => {
    findUserTokenByTokenRepositorySpy = new FindUserTokenByTokenRepositorySpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();
    deleteUserTokenByIdRepositorySpy = new DeleteUserTokenByIdRepositorySpy();

    refreshUserAccessTokenUseCase = new RefreshUserAccessTokenUseCase(
      findUserTokenByTokenRepositorySpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      refreshTokenExpiresTimeInMillissecondsMock,
      createUserTokenRepositorySpy,
      deleteUserTokenByIdRepositorySpy
    );
  });

  it('should call FindUserTokenByTokenRepository once with correct values', async () => {
    const findByTokenSpy = jest.spyOn(
      findUserTokenByTokenRepositorySpy,
      'findByToken'
    );

    const refreshToken = faker.datatype.uuid();

    await refreshUserAccessTokenUseCase.execute({
      refresh_token: refreshToken,
    });

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({ token: refreshToken });
  });

  it('should throw if FindUserTokenByTokenRepository throws', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserTokenNotFoundWithThisTokenError if token does not exist', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(undefined);

    const response = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(response).rejects.toBeInstanceOf(
      UserTokenNotFoundWithProvidedTokenError
    );
  });

  it('should throw UserTokenExpiredError if token has expired', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime() + 1);

    const promise = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(UserTokenExpiredError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    await refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      value: userTokenMock.user_id,
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateUuidProvider once', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    await refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserTokenRepository with correct values', async () => {
    const tokenExpiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
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

    await refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    const expiresIn = new Date(
      now.getTime() + refreshTokenExpiresTimeInMillissecondsMock
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userTokenMock.user_id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call DeleteUserTokenByIdRepositorySpy with correct values', async () => {
    const expiresInDate = faker.datatype.datetime();
    const userTokenId = faker.datatype.uuid();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
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

    await refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: userTokenId });
  });

  it('should throw if DeleteUserTokenByIdRepositorySpy throws', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce({ ...userTokenMock, expires_in: expiresInDate });

    jest.spyOn(Date, 'now').mockReturnValueOnce(expiresInDate.getTime());

    jest
      .spyOn(deleteUserTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(new Error());

    const promise = refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return access token and refresh token on success', async () => {
    const expiresInDate = faker.datatype.datetime();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
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

    const response = await refreshUserAccessTokenUseCase.execute(
      refreshUserAccessTokenUseCaseInputMock
    );

    expect(response).toEqual({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  });
});
