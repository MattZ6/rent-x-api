import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

import { ListAllCarCategoriesUseCase } from '@application/usecases/car/category/ListAll';

import { makeCarCategoryMock, makeErrorMock } from '../../../../domain';
import {
  FindAllCarCategoriesRepositorySpy,
  makeListAllCarCategoriesUseCaseDefaultLimitMock,
  makeListAllCarCategoriesUseCaseDefaultOffsetMock,
  makeListAllCarCategoriesUseCaseDefaultOrderByMock,
  makeListAllCarCategoriesUseCaseDefaultSortByMock,
  makeListAllCarCategoriesUseCaseInputMock,
} from '../../../mocks';

let listAllCarCategoriesUseCaseDefaultSortByMock: IListAllCarCategoriesUseCase.SortBy;
let listAllCarCategoriesUseCaseDefaultOrderByMock: IListAllCarCategoriesUseCase.OrderBy;
let listAllCarCategoriesUseCaseDefaultLimitMock: IListAllCarCategoriesUseCase.Limit;
let listAllCarCategoriesUseCaseDefaultOffsetMock: IListAllCarCategoriesUseCase.Offset;
let findAllCarCategoriesRepositorySpy: FindAllCarCategoriesRepositorySpy;

let listAllCarCategoriesUseCase: ListAllCarCategoriesUseCase;

describe('ListAllCarCategoriesUseCase', () => {
  beforeEach(() => {
    listAllCarCategoriesUseCaseDefaultSortByMock =
      makeListAllCarCategoriesUseCaseDefaultSortByMock();
    listAllCarCategoriesUseCaseDefaultOrderByMock =
      makeListAllCarCategoriesUseCaseDefaultOrderByMock();
    listAllCarCategoriesUseCaseDefaultLimitMock =
      makeListAllCarCategoriesUseCaseDefaultLimitMock();
    listAllCarCategoriesUseCaseDefaultOffsetMock =
      makeListAllCarCategoriesUseCaseDefaultOffsetMock();
    findAllCarCategoriesRepositorySpy = new FindAllCarCategoriesRepositorySpy();

    listAllCarCategoriesUseCase = new ListAllCarCategoriesUseCase(
      listAllCarCategoriesUseCaseDefaultSortByMock,
      listAllCarCategoriesUseCaseDefaultOrderByMock,
      listAllCarCategoriesUseCaseDefaultLimitMock,
      listAllCarCategoriesUseCaseDefaultOffsetMock,
      findAllCarCategoriesRepositorySpy
    );
  });

  it('should call FindAllCarCategoriesRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarCategoriesRepositorySpy, 'findAll');

    const input = makeListAllCarCategoriesUseCaseInputMock();

    await listAllCarCategoriesUseCase.execute(input);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: input.sort_by,
      order_by: input.order_by,
      take: input.limit,
      skip: input.offset,
    });
  });

  it('should call FindAllCarCategoriesRepository with default values if no input', async () => {
    const findAllSpy = jest.spyOn(findAllCarCategoriesRepositorySpy, 'findAll');

    await listAllCarCategoriesUseCase.execute({});

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: listAllCarCategoriesUseCaseDefaultSortByMock,
      order_by: listAllCarCategoriesUseCaseDefaultOrderByMock,
      take: listAllCarCategoriesUseCaseDefaultLimitMock,
      skip: listAllCarCategoriesUseCaseDefaultOffsetMock,
    });
  });

  it('should throw if FindAllCarCategoriesRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllCarCategoriesUseCaseInputMock();

    const promise = listAllCarCategoriesUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return CarCategories on success', async () => {
    const carCategoriesMock = [
      makeCarCategoryMock(),
      makeCarCategoryMock(),
      makeCarCategoryMock(),
    ];

    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockResolvedValueOnce(carCategoriesMock);

    const input = makeListAllCarCategoriesUseCaseInputMock();

    const output = await listAllCarCategoriesUseCase.execute(input);

    expect(output).toEqual(carCategoriesMock);
  });
});
