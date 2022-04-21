import { faker } from '@faker-js/faker';

import {
  UserTokenNotFoundWithProvidedTokenError,
  UserTokenExpiredError,
} from '@domain/errors';

import { RefreshUserAccessTokenUseCase } from '@application/usecases/user/RefreshAccessToken';

import { makeErrorMock, makeUserTokenMock } from '../../../domain';
import {
  FindUserTokenByTokenRepositorySpy,
  EncryptProviderSpy,
  GenerateUuidProviderSpy,
  CreateUserTokenRepositorySpy,
  DeleteUserTokenByIdRepositorySpy,
  makeRefreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds,
  makeRefreshUserAccessTokenUseCaseInputMock,
  makeGenerateUuidProviderOutputMock,
  makeEncryptProviderOutputMock,
} from '../../mocks';

let findUserTokenByTokenRepositorySpy: FindUserTokenByTokenRepositorySpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let refreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds: number;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
let deleteUserTokenByIdRepositorySpy: DeleteUserTokenByIdRepositorySpy;

let refreshUserAccessTokenUseCase: RefreshUserAccessTokenUseCase;

function setValidTokenTimeMock() {
  const userTokenMock = makeUserTokenMock();

  const findByTokenSpy = jest
    .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
    .mockResolvedValueOnce(userTokenMock);

  jest
    .spyOn(Date, 'now')
    .mockReturnValueOnce(userTokenMock.expires_in.getTime());

  return { userTokenMock, findByTokenSpy };
}

describe('RefreshUserAccessTokenUseCase', () => {
  beforeEach(() => {
    findUserTokenByTokenRepositorySpy = new FindUserTokenByTokenRepositorySpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    refreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds =
      makeRefreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();
    deleteUserTokenByIdRepositorySpy = new DeleteUserTokenByIdRepositorySpy();

    refreshUserAccessTokenUseCase = new RefreshUserAccessTokenUseCase(
      findUserTokenByTokenRepositorySpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      refreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds,
      createUserTokenRepositorySpy,
      deleteUserTokenByIdRepositorySpy
    );
  });

  it('should call FindUserTokenByTokenRepository once with correct values', async () => {
    const { findByTokenSpy } = setValidTokenTimeMock();

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({
      token: input.refresh_token,
      include: {
        user: true,
      },
    });
  });

  it('should throw if FindUserTokenByTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserTokenNotFoundWithProvidedTokenError if FindUserTokenByTokenRepository returns null', async () => {
    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(null);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const response = refreshUserAccessTokenUseCase.execute(input);

    await expect(response).rejects.toBeInstanceOf(
      UserTokenNotFoundWithProvidedTokenError
    );
  });

  it('should throw UserTokenExpiredError if token has expired', async () => {
    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(userTokenMock.expires_in.getTime() + 1);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(UserTokenExpiredError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const { userTokenMock } = setValidTokenTimeMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: userTokenMock.user_id,
      payload: {
        role: userTokenMock.user.role,
      },
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    setValidTokenTimeMock();

    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserTokenRepository with correct values', async () => {
    const { userTokenMock } = setValidTokenTimeMock();

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    const token = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    const expiresIn = new Date(
      now.getTime() +
        refreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userTokenMock.user_id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call DeleteUserTokenByIdRepositorySpy with correct values', async () => {
    const { userTokenMock } = setValidTokenTimeMock();

    const deleteByIdSpy = jest.spyOn(
      deleteUserTokenByIdRepositorySpy,
      'deleteById'
    );

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    await refreshUserAccessTokenUseCase.execute(input);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: userTokenMock.id });
  });

  it('should throw if DeleteUserTokenByIdRepositorySpy throws', async () => {
    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(findUserTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(userTokenMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(userTokenMock.expires_in.getTime());

    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteUserTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const promise = refreshUserAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return access token and refresh token on success', async () => {
    setValidTokenTimeMock();

    const accessToken = makeEncryptProviderOutputMock();
    const refreshToken = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(refreshToken);

    const input = makeRefreshUserAccessTokenUseCaseInputMock();

    const output = await refreshUserAccessTokenUseCase.execute(input);

    expect(output).toEqual({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  });
});
