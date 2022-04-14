import { ListAllCarCategoriesUseCase } from '@application/usecases/car/category/ListAllCarCategories';

import { carCategoryMock } from '../../../../domain/models/car-category.mock';
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
      order_by: listAllCarCategoriesUseCaseInputMock.order_by,
      order: listAllCarCategoriesUseCaseInputMock.order,
      take: listAllCarCategoriesUseCaseInputMock.limit,
      skip:
        (listAllCarCategoriesUseCaseInputMock.page - 1) *
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