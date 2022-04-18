import {
  ICheckIfUserExistsByDriverLicenseRepository,
  ICheckIfUserExistsByEmailRepository,
  ICheckIfUserExistsByIdRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

import { userMock } from '../../../../domain/entities';

export class CheckIfUserExistsByEmailRepositorySpy
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(
    _: ICheckIfUserExistsByEmailRepository.Input
  ): Promise<ICheckIfUserExistsByEmailRepository.Output> {
    return false;
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  async create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output> {
    const { name, email, password_hash, driver_license } = data;

    const user = { ...userMock };

    Object.assign(user, { name, email, password_hash, driver_license });

    return user;
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data;

    const user = { ...userMock };

    Object.assign(user, { email });

    return user;
  }
}

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data;

    const user = { ...userMock };

    Object.assign(user, { id });

    return user;
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  async update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output> {
    return data;
  }
}

export class CheckIfUserExistsByDriverLicenseRepositorySpy
  implements ICheckIfUserExistsByDriverLicenseRepository
{
  async checkIfExistsByDriverLicense(
    _: ICheckIfUserExistsByDriverLicenseRepository.Input
  ): Promise<ICheckIfUserExistsByDriverLicenseRepository.Output> {
    return false;
  }
}

export class CheckIfUserExistsByIdRepositorySpy
  implements ICheckIfUserExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfUserExistsByIdRepository.Input
  ): Promise<ICheckIfUserExistsByIdRepository.Output> {
    return true;
  }
}
