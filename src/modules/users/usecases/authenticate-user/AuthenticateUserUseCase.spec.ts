import { AppError } from '@errors/AppError';

import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { CreateUserUseCase } from '../create-user/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

let createUserUseCase: CreateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
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
