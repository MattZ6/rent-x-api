import { InMemoryUserRefreshTokens } from '@modules/users/repositories/in-memory/InMemoryUserRefreshTokensRepository';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../create-user/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let userRefreshTokens: InMemoryUserRefreshTokens;
let dateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;

let createUserUseCase: CreateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userRefreshTokens = new InMemoryUserRefreshTokens();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      userRefreshTokens,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an existing user', async () => {
    const email = 'johndoe@email.com';
    const password = '123456';

    await createUserUseCase.execute({
      name: 'John Doe',
      email,
      password,
      driver_license: '00666',
    });

    const result = await authenticateUserUseCase.execute({ email, password });

    expect(result).toHaveProperty('access_token');
  });

  it('should not be able to authenticate a non-existent user', async () => {
    const promise = authenticateUserUseCase.execute({
      email: 'nonexistent@email.com',
      password: '123456',
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a existent user with wrong password', async () => {
    const email = 'johndoe@email.com';

    await createUserUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
      driver_license: '00666',
    });

    const promise = authenticateUserUseCase.execute({
      email,
      password: 'wrongpassword',
    });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
