import { faker } from '@faker-js/faker';

import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetUserProfileUseCase } from '@application/usecases/user/GetUserProfile';

import { userMock } from '../../../domain/models/user/user.mock';
import {
  FindUserByIdRepositorySpy,
  getUserProfileUseCaseInputMock,
} from '../../mocks';

let findUserByIdRepositorySpy: FindUserByIdRepositorySpy;

let getUserProfileUseCase: GetUserProfileUseCase;

describe('GetUserProfileUseCase', () => {
  beforeEach(() => {
    findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();

    getUserProfileUseCase = new GetUserProfileUseCase(
      findUserByIdRepositorySpy
    );
  });

  it('should call FindUserByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');

    const userId = faker.datatype.uuid();

    await getUserProfileUseCase.execute({
      user_id: userId,
    });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: userId,
      relations: ['avatar'],
    });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = getUserProfileUseCase.execute(
      getUserProfileUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw UserNotFoundWithThisIdError if user does not exists', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = getUserProfileUseCase.execute(
      getUserProfileUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should return user on success', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const user = await getUserProfileUseCase.execute(
      getUserProfileUseCaseInputMock
    );

    expect(user).toEqual(userMock);
  });
});
