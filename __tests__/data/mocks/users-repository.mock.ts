import faker from 'faker';

import { IUser } from '@domain/models/User';

import {
  CreateUserRepositoryData,
  ICreateUserRepository,
  IFindUserByEmailRepository,
} from '@data/protocols/repositories/user';
import { ICheckIfUserExistsByEmailRepository } from '@data/protocols/repositories/user/CheckIfUserExistsByEmailRepository';

import { userMock } from '../../domain/models/user.mock';

export class CheckIfUserExistsByEmailRepositorySpy
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(_: string): Promise<boolean> {
    return false;
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  async create(data: CreateUserRepositoryData): Promise<IUser> {
    const { name, email, password_hash, driver_license } = data;

    const user = { ...userMock };

    Object.assign(user, { name, email, password_hash, driver_license });

    return user;
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = { ...userMock };

    Object.assign(user, { email });

    return user;
  }
}
