import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

import { ListAllCarSpecificationsUseCase } from '@application/usecases/car/specification/ListAll';

import { makeCarSpecificationMock, makeErrorMock } from '../../../../domain';
import {
  FindAllCarSpecificationsRepositorySpy,
  makeListAllCarSpecificationsUseCaseDefaultLimitMock,
  makeListAllCarSpecificationsUseCaseDefaultOffsetMock,
  makeListAllCarSpecificationsUseCaseDefaultOrderByMock,
  makeListAllCarSpecificationsUseCaseDefaultSortByMock,
  makeListAllCarSpecificationsUseCaseInputMock,
} from '../../../mocks';

let listAllCarSpecificationsUseCaseDefaultSortByMock: IListAllCarSpecificationsUseCase.SortBy;
let listAllCarSpecificationsUseCaseDefaultOrderByMock: IListAllCarSpecificationsUseCase.OrderBy;
let listAllCarSpecificationsUseCaseDefaultLimitMock: IListAllCarSpecificationsUseCase.Limit;
let listAllCarSpecificationsUseCaseDefaultOffsetMock: IListAllCarSpecificationsUseCase.Offset;
let findAllCarSpecificationsRepositorySpy: FindAllCarSpecificationsRepositorySpy;

let listAllCarSpecificationsUseCase: ListAllCarSpecificationsUseCase;

describe('ListAllCarSpecificationsUseCase', () => {
  beforeEach(() => {
    listAllCarSpecificationsUseCaseDefaultSortByMock =
      makeListAllCarSpecificationsUseCaseDefaultSortByMock();
    listAllCarSpecificationsUseCaseDefaultOrderByMock =
      makeListAllCarSpecificationsUseCaseDefaultOrderByMock();
    listAllCarSpecificationsUseCaseDefaultLimitMock =
      makeListAllCarSpecificationsUseCaseDefaultLimitMock();
    listAllCarSpecificationsUseCaseDefaultOffsetMock =
      makeListAllCarSpecificationsUseCaseDefaultOffsetMock();
    findAllCarSpecificationsRepositorySpy =
      new FindAllCarSpecificationsRepositorySpy();

    listAllCarSpecificationsUseCase = new ListAllCarSpecificationsUseCase(
      listAllCarSpecificationsUseCaseDefaultSortByMock,
      listAllCarSpecificationsUseCaseDefaultOrderByMock,
      listAllCarSpecificationsUseCaseDefaultLimitMock,
      listAllCarSpecificationsUseCaseDefaultOffsetMock,
      findAllCarSpecificationsRepositorySpy
    );
  });

  it('should call FindAllCarSpecificationsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(
      findAllCarSpecificationsRepositorySpy,
      'findAll'
    );

    const input = makeListAllCarSpecificationsUseCaseInputMock();

    await listAllCarSpecificationsUseCase.execute(input);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: input.sort_by,
      order_by: input.order_by,
      take: input.limit,
      skip: input.offset,
    });
  });

  it('should call FindAllCarSpecificationsRepository with default values if no input', async () => {
    const findAllSpy = jest.spyOn(
      findAllCarSpecificationsRepositorySpy,
      'findAll'
    );

    await listAllCarSpecificationsUseCase.execute({});

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: listAllCarSpecificationsUseCaseDefaultSortByMock,
      order_by: listAllCarSpecificationsUseCaseDefaultOrderByMock,
      take: listAllCarSpecificationsUseCaseDefaultLimitMock,
      skip: listAllCarSpecificationsUseCaseDefaultOffsetMock,
    });
  });

  it('should throw if FindAllCarSpecificationsRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllCarSpecificationsUseCaseInputMock();

    const promise = listAllCarSpecificationsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return CarSpecifications on success', async () => {
    const carSpecificationsMock = [
      makeCarSpecificationMock(),
      makeCarSpecificationMock(),
      makeCarSpecificationMock(),
    ];

    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(carSpecificationsMock);

    const input = makeListAllCarSpecificationsUseCaseInputMock();

    const output = await listAllCarSpecificationsUseCase.execute(input);

    expect(output).toEqual(carSpecificationsMock);
  });
});
