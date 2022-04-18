import { faker } from '@faker-js/faker';

import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';

import { AuthenticateUserUseCase } from '@application/usecases/user/AuthenticateUser';

import { userMock } from '../../../domain/models/user.mock';
import {
  authenticateUserUseCaseInputMock,
  CompareHashProviderSpy,
  CreateUserTokenRepositorySpy,
  EncryptProviderSpy,
  FindUserByEmailRepositorySpy,
  GenerateUuidProviderSpy,
  authenticateUserRefreshTokenExpiresTimeInMillissecondsMock,
} from '../../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;

let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    findUserByEmailRepositorySpy = new FindUserByEmailRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    createUserTokenRepositorySpy = new CreateUserTokenRepositorySpy();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      findUserByEmailRepositorySpy,
      compareHashProviderSpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      authenticateUserRefreshTokenExpiresTimeInMillissecondsMock,
      createUserTokenRepositorySpy
    );
  });

  it('should call FindUserByEmailRepository once with correct values', async () => {
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositorySpy,
      'findByEmail'
    );

    const email = faker.internet.email();

    await authenticateUserUseCase.execute({
      ...authenticateUserUseCaseInputMock,
      email,
    });

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith({ email });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundWithThisEmailError if user does not exists', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedEmailError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const hashedPassword = faker.internet.password();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce({ ...userMock, password_hash: hashedPassword });

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const password = faker.internet.password();

    await authenticateUserUseCase.execute({
      ...authenticateUserUseCaseInputMock,
      password,
    });

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith({
      value: password,
      value_to_compare: hashedPassword,
    });
  });

  it('should throw if CompareHashProvider throws', async () => {
    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw IncorrectPassword if passwords does not match', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const userId = faker.datatype.uuid();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce({
        ...userMock,
        id: userId,
      });

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    await authenticateUserUseCase.execute(authenticateUserUseCaseInputMock);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      value: userId,
    });
  });

  it('should throw it EncryptProvider throws', async () => {
    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    await authenticateUserUseCase.execute(authenticateUserUseCaseInputMock);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw it GenerateUuidProvider throws', async () => {
    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserTokenRepository with correct values', async () => {
    const userId = faker.datatype.uuid();

    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce({ ...userMock, id: userId });

    const token = faker.datatype.uuid();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const dateNow = faker.datatype.datetime().getTime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(dateNow);

    const expiresIn = new Date(
      dateNow + authenticateUserRefreshTokenExpiresTimeInMillissecondsMock
    );

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    await authenticateUserUseCase.execute(authenticateUserUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      user_id: userId,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    jest
      .spyOn(createUserTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return access token and refresh token on success', async () => {
    const accessToken = faker.datatype.uuid();
    const refreshToken = faker.datatype.uuid();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(refreshToken);

    const authentication = await authenticateUserUseCase.execute(
      authenticateUserUseCaseInputMock
    );

    expect(authentication).toHaveProperty('access_token', accessToken);
    expect(authentication).toHaveProperty('refresh_token', refreshToken);
  });
});
