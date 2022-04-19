import { UserNotFoundWithProvidedIdError } from '@domain/errors';

import { GetUserProfileUseCase } from '@application/usecases/user/GetProfile';

import { makeErrorMock, makeUserMock } from '../../../domain';
import {
  FindUserByIdRepositorySpy,
  makeGetUserProfileUseCaseInputMock,
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

    const input = makeGetUserProfileUseCaseInputMock();

    await getUserProfileUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: input.id,
    });
  });

  it('should throw if FindUserByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeGetUserProfileUseCaseInputMock();

    const promise = getUserProfileUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if FindUserByIdRepository returns null', async () => {
    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const input = makeGetUserProfileUseCaseInputMock();

    const promise = getUserProfileUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should return user on success', async () => {
    const userMock = makeUserMock();

    jest
      .spyOn(findUserByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(userMock);

    const input = makeGetUserProfileUseCaseInputMock();

    const user = await getUserProfileUseCase.execute(input);

    expect(user).toEqual(userMock);
  });
});
