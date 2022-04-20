import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

import { ListAllCarBrandsUseCase } from '@application/usecases/car/brand/ListAll';

import { makeCarBrandMock, makeErrorMock } from '../../../../domain';
import {
  FindAllCarBrandsRepositorySpy,
  makeListAllCarBrandsUseCaseDefaultLimitMock,
  makeListAllCarBrandsUseCaseDefaultOffsetMock,
  makeListAllCarBrandsUseCaseDefaultOrderByMock,
  makeListAllCarBrandsUseCaseDefaultSortByMock,
  makeListAllCarBrandsUseCaseInputMock,
} from '../../../mocks';

let listAllCarBrandsUseCaseDefaultSortByMock: IListAllCarBrandsUseCase.SortBy;
let listAllCarBrandsUseCaseDefaultOrderByMock: IListAllCarBrandsUseCase.OrderBy;
let listAllCarBrandsUseCaseDefaultLimitMock: IListAllCarBrandsUseCase.Limit;
let listAllCarBrandsUseCaseDefaultOffsetMock: IListAllCarBrandsUseCase.Offset;
let findAllCarBrandsRepositorySpy: FindAllCarBrandsRepositorySpy;

let listAllCarBrandsUseCase: ListAllCarBrandsUseCase;

describe('ListAllCarBrandsUseCase', () => {
  beforeEach(() => {
    listAllCarBrandsUseCaseDefaultSortByMock =
      makeListAllCarBrandsUseCaseDefaultSortByMock();
    listAllCarBrandsUseCaseDefaultOrderByMock =
      makeListAllCarBrandsUseCaseDefaultOrderByMock();
    listAllCarBrandsUseCaseDefaultLimitMock =
      makeListAllCarBrandsUseCaseDefaultLimitMock();
    listAllCarBrandsUseCaseDefaultOffsetMock =
      makeListAllCarBrandsUseCaseDefaultOffsetMock();
    findAllCarBrandsRepositorySpy = new FindAllCarBrandsRepositorySpy();

    listAllCarBrandsUseCase = new ListAllCarBrandsUseCase(
      listAllCarBrandsUseCaseDefaultSortByMock,
      listAllCarBrandsUseCaseDefaultOrderByMock,
      listAllCarBrandsUseCaseDefaultLimitMock,
      listAllCarBrandsUseCaseDefaultOffsetMock,
      findAllCarBrandsRepositorySpy
    );
  });

  it('should call FindAllCarBrandsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarBrandsRepositorySpy, 'findAll');

    const input = makeListAllCarBrandsUseCaseInputMock();

    await listAllCarBrandsUseCase.execute(input);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: input.sort_by,
      order_by: input.order_by,
      take: input.limit,
      skip: input.offset,
    });
  });

  it('should call FindAllCarBrandsRepository with default values if no input', async () => {
    const findAllSpy = jest.spyOn(findAllCarBrandsRepositorySpy, 'findAll');

    await listAllCarBrandsUseCase.execute({});

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: listAllCarBrandsUseCaseDefaultSortByMock,
      order_by: listAllCarBrandsUseCaseDefaultOrderByMock,
      take: listAllCarBrandsUseCaseDefaultLimitMock,
      skip: listAllCarBrandsUseCaseDefaultOffsetMock,
    });
  });

  it('should throw if FindAllCarBrandsRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllCarBrandsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllCarBrandsUseCaseInputMock();

    const promise = listAllCarBrandsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return CarBrands on success', async () => {
    const carBrandMocks = [
      makeCarBrandMock(),
      makeCarBrandMock(),
      makeCarBrandMock(),
    ];

    jest
      .spyOn(findAllCarBrandsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(carBrandMocks);

    const input = makeListAllCarBrandsUseCaseInputMock();

    const output = await listAllCarBrandsUseCase.execute(input);

    expect(output).toEqual(carBrandMocks);
  });
});
