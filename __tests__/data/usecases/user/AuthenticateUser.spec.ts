import faker from 'faker';

import {
  IncorrectPassword,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';

import { AuthenticateUserUseCase } from '@data/usecases/user/AuthenticateUser';

import { userMock } from '../../../domain/models/user.mock';
import {
  CompareHashProviderSpy,
  CreateUserTokenRepositorySpy,
  EncryptProviderSpy,
  FindUserByEmailRepositorySpy,
  GenerateUuidProviderSpy,
} from '../../mocks';

let findUserByEmailRepositorySpy: FindUserByEmailRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let createUserTokenRepositorySpy: CreateUserTokenRepositorySpy;
const refreshTokenExpiresTimeInMillisseconds = 1 * 24 * 60 * 60 * 1000;

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
      refreshTokenExpiresTimeInMillisseconds,
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
      email,
      password: faker.internet.password(),
    });

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith({ email });
  });

  it('should throw if FindUserByEmailRepository throws', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundWithThisEmailError if user does not exists', async () => {
    jest
      .spyOn(findUserByEmailRepositorySpy, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithThisEmailError
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
      email: faker.internet.email(),
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

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw IncorrectPassword if passwords does not match', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(IncorrectPassword);
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

    await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      value: userId,
    });
  });

  it('should throw it EncryptProvider throws', async () => {
    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw it GenerateUuidProvider throws', async () => {
    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

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
      dateNow + refreshTokenExpiresTimeInMillisseconds
    );

    const createSpy = jest.spyOn(createUserTokenRepositorySpy, 'create');

    await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

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

    const promise = authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

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

    const authentication = await authenticateUserUseCase.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(authentication).toHaveProperty('access_token', accessToken);
    expect(authentication).toHaveProperty('refresh_token', refreshToken);
  });
});
