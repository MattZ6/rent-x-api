import faker from 'faker';

import { UserAlreadyExistsWithThisEmailError } from '@domain/errors';

import { CreateUserUseCase } from '@data/usecases/user/CreateUser';

import {
  CheckIfUserExistsByEmailRepositorySpy,
  CreateUserRepositorySpy,
  GenerateHashProviderSpy,
} from '../../mocks';

let checkIfUserExistsByEmailRepositorySpy: CheckIfUserExistsByEmailRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let createUserRepositorySpy: CreateUserRepositorySpy;

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByEmailRepositorySpy =
      new CheckIfUserExistsByEmailRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    createUserRepositorySpy = new CreateUserRepositorySpy();

    createUserUseCase = new CreateUserUseCase(
      checkIfUserExistsByEmailRepositorySpy,
      generateHashProviderSpy,
      createUserRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByEmailRepository once with correct values', async () => {
    const checkIfExistsByEmailSpy = jest.spyOn(
      checkIfUserExistsByEmailRepositorySpy,
      'checkIfExistsByEmail'
    );

    const email = faker.internet.email();

    await createUserUseCase.execute({
      name: faker.name.findName(),
      email,
      driver_license: faker.datatype.string(),
      password: faker.internet.password(),
    });

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      driver_license: faker.datatype.string(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserAlreadyExistsWithThisEmailError if provided email is already in use', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockResolvedValueOnce(true);

    const promise = createUserUseCase.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      driver_license: faker.datatype.string(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithThisEmailError
    );
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const password = faker.internet.password();

    await createUserUseCase.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      driver_license: faker.datatype.string(),
      password,
    });

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith(password);
  });

  it('should throw if GenerateHashProvider throws', async () => {
    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      driver_license: faker.datatype.string(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserRepository once with correct values', async () => {
    const hashedPassword = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(hashedPassword);

    const createSpy = jest.spyOn(createUserRepositorySpy, 'create');

    const name = faker.name.findName();
    const email = faker.internet.email();
    const driver_license = faker.datatype.string();
    const password = faker.internet.password();

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name,
      email,
      password_hash: hashedPassword,
      driver_license,
    });
  });

  it('should throw if CreateUserRepository throws', async () => {
    jest
      .spyOn(createUserRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute({
      name: faker.name.findName(),
      email: faker.internet.email(),
      driver_license: faker.datatype.string(),
      password: faker.internet.password(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return a new user on success', async () => {
    const passwordHash = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(passwordHash);

    const name = faker.name.findName();
    const email = faker.internet.email();
    const driver_license = faker.datatype.string();

    const response = await createUserUseCase.execute({
      name,
      email,
      driver_license,
      password: faker.internet.password(),
    });

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name', name);
    expect(response).toHaveProperty('email', email);
    expect(response).toHaveProperty('password_hash', passwordHash);
    expect(response).toHaveProperty('driver_license', driver_license);
    expect(response).toHaveProperty('created_at');
    expect(response).toHaveProperty('updated_at');
  });
});
