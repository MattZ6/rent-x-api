import {
  ICheckIfUserExistsByDriverLicenseRepository,
  ICheckIfUserExistsByEmailRepository,
  ICheckIfUserExistsByEmailWithDifferentIdRepository,
  ICheckIfUserExistsByIdRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

import { makeUserMock } from '../../../../domain/entities';

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
    const { role, name, email, password_hash, driver_license } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, {
      role,
      name,
      email,
      password_hash,
      driver_license,
    });

    return userMock;
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, { email });

    return userMock;
  }
}

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, { id });

    return userMock;
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  async update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output> {
    const { id, driver_license, email, name, password_hash, role } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, {
      id,
      driver_license,
      email,
      name,
      password_hash,
      role,
    });

    return userMock;
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

export class CheckIfUserExistsByEmailWithDifferentIdRepositorySpy
  implements ICheckIfUserExistsByEmailWithDifferentIdRepository
{
  async checkIfExistsByEmailWithDifferentId(
    _: ICheckIfUserExistsByEmailWithDifferentIdRepository.Input
  ): Promise<ICheckIfUserExistsByEmailWithDifferentIdRepository.Output> {
    return false;
  }
}
