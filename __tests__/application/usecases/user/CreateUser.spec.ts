import { faker } from '@faker-js/faker';

import {
  UserAlreadyExistsWithProvidedDriverLicenseError,
  UserAlreadyExistsWithProvidedEmailError,
} from '@domain/errors';

import { CreateUserUseCase } from '@application/usecases/user/CreateUser';

import {
  CheckIfUserExistsByDriverLicenseRepositorySpy,
  CheckIfUserExistsByEmailRepositorySpy,
  CreateUserRepositorySpy,
  createUserUseCaseInputMock,
  GenerateHashProviderSpy,
} from '../../mocks';

let checkIfUserExistsByEmailRepositorySpy: CheckIfUserExistsByEmailRepositorySpy;
let checkIfUserExistsByDriverLicenseRepositorySpy: CheckIfUserExistsByDriverLicenseRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let createUserRepositorySpy: CreateUserRepositorySpy;

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByEmailRepositorySpy =
      new CheckIfUserExistsByEmailRepositorySpy();
    checkIfUserExistsByDriverLicenseRepositorySpy =
      new CheckIfUserExistsByDriverLicenseRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    createUserRepositorySpy = new CreateUserRepositorySpy();

    createUserUseCase = new CreateUserUseCase(
      checkIfUserExistsByEmailRepositorySpy,
      checkIfUserExistsByDriverLicenseRepositorySpy,
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
      ...createUserUseCaseInputMock,
      email,
    });

    expect(checkIfExistsByEmailSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByEmailSpy).toHaveBeenCalledWith({ email });
  });

  it('should throw if CheckIfUserExistsByEmailRepository throws', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute(createUserUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserAlreadyExistsWithThisEmailError if provided email is already in use', async () => {
    jest
      .spyOn(checkIfUserExistsByEmailRepositorySpy, 'checkIfExistsByEmail')
      .mockResolvedValueOnce(true);

    const promise = createUserUseCase.execute(createUserUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithProvidedEmailError
    );
  });

  it('should call CheckIfUserExistsByDriverLicenseRepository once with correct values', async () => {
    const checkIfExistsByDriverLicenseSpy = jest.spyOn(
      checkIfUserExistsByDriverLicenseRepositorySpy,
      'checkIfExistsByDriverLicense'
    );

    const driverLicense = faker.datatype.string();

    await createUserUseCase.execute({
      ...createUserUseCaseInputMock,
      driver_license: driverLicense,
    });

    expect(checkIfExistsByDriverLicenseSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByDriverLicenseSpy).toHaveBeenCalledWith({
      driver_license: driverLicense,
    });
  });

  it('should throw if CheckIfUserExistsByDriverLicenseRepository throws', async () => {
    jest
      .spyOn(
        checkIfUserExistsByDriverLicenseRepositorySpy,
        'checkIfExistsByDriverLicense'
      )
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute(createUserUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserAlreadyExistsWithThisDriverLicenseError if provided driver license is already in use', async () => {
    jest
      .spyOn(
        checkIfUserExistsByDriverLicenseRepositorySpy,
        'checkIfExistsByDriverLicense'
      )
      .mockResolvedValueOnce(true);

    const promise = createUserUseCase.execute(createUserUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(
      UserAlreadyExistsWithProvidedDriverLicenseError
    );
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const password = faker.internet.password();

    await createUserUseCase.execute({
      ...createUserUseCaseInputMock,
      password,
    });

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith({ value: password });
  });

  it('should throw if GenerateHashProvider throws', async () => {
    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute(createUserUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserRepository once with correct values', async () => {
    const hashedPassword = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(hashedPassword);

    const createSpy = jest.spyOn(createUserRepositorySpy, 'create');

    await createUserUseCase.execute(createUserUseCaseInputMock);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name: createUserUseCaseInputMock.name,
      email: createUserUseCaseInputMock.email,
      driver_license: createUserUseCaseInputMock.driver_license,
      password_hash: hashedPassword,
    });
  });

  it('should throw if CreateUserRepository throws', async () => {
    jest
      .spyOn(createUserRepositorySpy, 'create')
      .mockRejectedValueOnce(new Error());

    const promise = createUserUseCase.execute(createUserUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should return a new user on success', async () => {
    const passwordHash = faker.internet.password();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(passwordHash);

    const response = await createUserUseCase.execute(
      createUserUseCaseInputMock
    );

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name', createUserUseCaseInputMock.name);
    expect(response).toHaveProperty('email', createUserUseCaseInputMock.email);
    expect(response).toHaveProperty('password_hash', passwordHash);
    expect(response).toHaveProperty(
      'driver_license',
      createUserUseCaseInputMock.driver_license
    );
    expect(response).toHaveProperty('created_at');
    expect(response).toHaveProperty('updated_at');
  });
});
