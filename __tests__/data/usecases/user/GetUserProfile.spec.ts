import faker from 'faker';

import { UserNotFoundWithThisIdError } from '@domain/errors';

import { GetUserProfileUseCase } from '@data/usecases/user/GetUserProfile';

import { userMock } from '../../../domain/models/user.mock';
import { FindUserByIdRepositorySpy } from '../../mocks';

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
    expect(findByIdSpy).toHaveBeenCalledWith(userId);
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = getUserProfileUseCase.execute({
      user_id: faker.datatype.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return UserNotFoundWithThisIdError if user does not exists', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const response = await getUserProfileUseCase.execute({
      user_id: faker.datatype.uuid(),
    });

    expect(response).toEqual(new UserNotFoundWithThisIdError());
  });

  it('should return user on success', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const user = await getUserProfileUseCase.execute({
      user_id: faker.datatype.uuid(),
    });

    expect(user).toEqual(userMock);
  });
});
