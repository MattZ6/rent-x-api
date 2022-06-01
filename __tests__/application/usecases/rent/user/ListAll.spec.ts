import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IListAllUserRentalsUseCase } from '@domain/usecases/rent/user/ListAll';

import { ListAllUserRentalsUseCase } from '@application/usecases/rent/user/ListAll';

import { makeErrorMock, makeRentMock } from '../../../../domain';
import {
  CheckIfUserExistsByIdRepositorySpy,
  FindAllRentsFromUserRepositorySpy,
  makeListAllUserRentalsUseCaseDefaultLimitMock,
  makeListAllUserRentalsUseCaseDefaultOffsetMock,
  makeListAllUserRentalsUseCaseInputMock,
} from '../../../mocks';

let checkIfUserExistsByIdRepositorySpy: CheckIfUserExistsByIdRepositorySpy;
let listAllUserRentalsUseCaseDefaultLimitMock: IListAllUserRentalsUseCase.Limit;
let listAllUserRentalsUseCaseDefaultOffsetMock: IListAllUserRentalsUseCase.Offset;
let findAllRentsFromUserRepositorySpy: FindAllRentsFromUserRepositorySpy;

let listAllUserRentalsUseCase: ListAllUserRentalsUseCase;

describe('ListAllUserRentalsUseCase', () => {
  beforeEach(() => {
    checkIfUserExistsByIdRepositorySpy =
      new CheckIfUserExistsByIdRepositorySpy();
    listAllUserRentalsUseCaseDefaultLimitMock =
      makeListAllUserRentalsUseCaseDefaultLimitMock();
    listAllUserRentalsUseCaseDefaultOffsetMock =
      makeListAllUserRentalsUseCaseDefaultOffsetMock();
    findAllRentsFromUserRepositorySpy = new FindAllRentsFromUserRepositorySpy();

    listAllUserRentalsUseCase = new ListAllUserRentalsUseCase(
      checkIfUserExistsByIdRepositorySpy,
      listAllUserRentalsUseCaseDefaultLimitMock,
      listAllUserRentalsUseCaseDefaultOffsetMock,
      findAllRentsFromUserRepositorySpy
    );
  });

  it('should call CheckIfUserExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfUserExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeListAllUserRentalsUseCaseInputMock();

    await listAllUserRentalsUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.user_id,
    });
  });

  it('should throw if CheckIfUserExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllUserRentalsUseCaseInputMock();

    const promise = listAllUserRentalsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw UserNotFoundWithProvidedIdError if CheckIfUserExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfUserExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeListAllUserRentalsUseCaseInputMock();

    const promise = listAllUserRentalsUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      UserNotFoundWithProvidedIdError
    );
  });

  it('should call FindAllRentsFromUserRepository once with correct values', async () => {
    const findAllFromUserSpy = jest.spyOn(
      findAllRentsFromUserRepositorySpy,
      'findAllFromUser'
    );

    const input = makeListAllUserRentalsUseCaseInputMock();

    await listAllUserRentalsUseCase.execute(input);

    expect(findAllFromUserSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromUserSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
      take: input.limit,
      skip: input.offset,
      include: {
        cars: true,
      },
    });
  });

  it('should call FindAllRentsFromUserRepository with default values if no input', async () => {
    const findAllFromUserSpy = jest.spyOn(
      findAllRentsFromUserRepositorySpy,
      'findAllFromUser'
    );

    const input = makeListAllUserRentalsUseCaseInputMock();

    await listAllUserRentalsUseCase.execute({
      user_id: input.user_id,
    });

    expect(findAllFromUserSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromUserSpy).toHaveBeenCalledWith({
      user_id: input.user_id,
      take: listAllUserRentalsUseCaseDefaultLimitMock,
      skip: listAllUserRentalsUseCaseDefaultOffsetMock,
      include: {
        cars: true,
      },
    });
  });

  it('should throw if FindAllRentsFromUserRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllRentsFromUserRepositorySpy, 'findAllFromUser')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllUserRentalsUseCaseInputMock();

    const promise = listAllUserRentalsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Rents on success', async () => {
    const rentsMock = [makeRentMock(), makeRentMock(), makeRentMock()];

    jest
      .spyOn(findAllRentsFromUserRepositorySpy, 'findAllFromUser')
      .mockResolvedValueOnce(rentsMock);

    const input = makeListAllUserRentalsUseCaseInputMock();

    const output = await listAllUserRentalsUseCase.execute(input);

    expect(output).toEqual(rentsMock);
  });
});
