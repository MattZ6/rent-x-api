import { ListAllCarCategoriesUseCase } from '@application/usecases/car/category/ListAll';

import { carCategoryMock } from '../../../../domain/entities';
import {
  FindAllCarCategoriesRepositorySpy,
  listAllCarCategoriesUseCaseInputMock,
} from '../../../mocks';

let findAllCarCategoriesRepositorySpy: FindAllCarCategoriesRepositorySpy;

let listAllCarCategoriesUseCase: ListAllCarCategoriesUseCase;

describe('ListAllCarCategoriesUseCase', () => {
  beforeEach(() => {
    findAllCarCategoriesRepositorySpy = new FindAllCarCategoriesRepositorySpy();

    listAllCarCategoriesUseCase = new ListAllCarCategoriesUseCase(
      findAllCarCategoriesRepositorySpy
    );
  });

  it('should call FindAllCarCategoriesRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarCategoriesRepositorySpy, 'findAll');

    await listAllCarCategoriesUseCase.execute(
      listAllCarCategoriesUseCaseInputMock
    );

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarCategoriesUseCaseInputMock.sort_by,
      order: listAllCarCategoriesUseCaseInputMock.order_by,
      take: listAllCarCategoriesUseCaseInputMock.limit,
      skip:
        (listAllCarCategoriesUseCaseInputMock.offset - 1) *
        listAllCarCategoriesUseCaseInputMock.limit,
    });
  });

  it('should throw if FindAllCarCategoriesRepository throws', async () => {
    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarCategoriesUseCase.execute(
      listAllCarCategoriesUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return car categories', async () => {
    const categoriesMock = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockResolvedValueOnce(categoriesMock);

    const categories = await listAllCarCategoriesUseCase.execute(
      listAllCarCategoriesUseCaseInputMock
    );

    expect(categories).toEqual(categoriesMock);
  });
});
