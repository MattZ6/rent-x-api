import { faker } from '@faker-js/faker';

import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';

import { AuthenticateUserUseCase } from '@application/usecases/user/Authenticate';

import {
  makeErrorMock,
  makeUserMock,
  makeUserTokenMock,
} from '../../../domain';
import {
  CompareHashProviderSpy,
  CreateUserTokenRepositorySpy,
  EncryptProviderSpy,
  FindUserByEmailRepositorySpy,
  GenerateUuidProviderSpy,
  makeAuthenticateUserUseCaseInputMock,
  makeGenerateUuidProviderOutputMock,
  makeEncryptProviderOutputMock,
  makeAuthenticateUserUseCaseRefreshTokenExpiresInMillisseconds,
} from '../../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let authenticateUserUseCaseRefreshTokenExpiresInMillisseconds: number;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    authenticateUserUseCaseRefreshTokenExpiresInMillisseconds =
      makeAuthenticateUserUseCaseRefreshTokenExpiresInMillisseconds();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      findUserByEmailRepositorySpy,
      compareHashProviderSpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      authenticateUserUseCaseRefreshTokenExpiresInMillisseconds,
      createUserTokenRepositorySpy
    );
  });

  it('should call FindUserByEmailRepository once with correct values', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositorySpy,
      'findByEmail'
    );

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith({ email: input.email });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithThisEmailError if FindUserByEmailRepository returns null', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(null);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedEmailError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith({
      value: input.password,
      hashed_value: userMock.password_hash,
    });
  });

  it('should throw if CompareHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw WrongPasswordError if CompareHashProvider returns false', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: userMock.id,
      payload: { role: userMock.role },
    });
  });

  it('should throw it EncryptProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw it GenerateUuidProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserTokenRepository with correct values', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(userMock);

    const token = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const dateNow = faker.datatype.datetime().getTime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(dateNow);

    const expiresIn = new Date(
      dateNow + authenticateUserUseCaseRefreshTokenExpiresInMillisseconds
    );

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    const input = makeAuthenticateUserUseCaseInputMock();

    await authenticateUserUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userMock.id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateUserUseCaseInputMock();

    const promise = authenticateUserUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Authentication on success', async () => {
    const encryptProviderOutputMock = makeEncryptProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(encryptProviderOutputMock);

    const userTokenMock = makeUserTokenMock();

    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockResolvedValueOnce(userTokenMock);

    const input = makeAuthenticateUserUseCaseInputMock();

    const output = await authenticateUserUseCase.execute(input);

    expect(output).toEqual({
      access_token: encryptProviderOutputMock,
      refresh_token: userTokenMock.token,
    });
  });
});
