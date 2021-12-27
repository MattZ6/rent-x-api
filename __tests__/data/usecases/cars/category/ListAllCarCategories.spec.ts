import faker from 'faker';

import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAllCarCategories';

import { ListAllCarCategoriesUseCase } from '@data/usecases/car/category/ListAllCarCategories';

import { carCategoryMock } from '../../../../domain/models/car-category.mock';
import { FindAllCarCategoriesRepositorySpy } from '../../../mocks';

let findAllCarCategoriesRepositorySpy: FindAllCarCategoriesRepositorySpy;

let listAllCarCategoriesUseCase: ListAllCarCategoriesUseCase;

const listAllCarCategoriesUseCaseInput: IListAllCarCategoriesUseCase.Input = {
  order_by: faker.random.arrayElement(['name', 'created_at']),
  order: faker.random.arrayElement(['ASC', 'DESC']),
  limit: faker.datatype.number({ min: 1, max: 100 }),
  page: faker.datatype.number({ min: 1, max: 30 }),
};

describe('ListAllCarCategoriesUseCase', () => {
  beforeEach(() => {
    findAllCarCategoriesRepositorySpy = new FindAllCarCategoriesRepositorySpy();

    listAllCarCategoriesUseCase = new ListAllCarCategoriesUseCase(
      findAllCarCategoriesRepositorySpy
    );
  });

  it('should call FindAllCarCategoriesRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarCategoriesRepositorySpy, 'findAll');

    await listAllCarCategoriesUseCase.execute(listAllCarCategoriesUseCaseInput);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarCategoriesUseCaseInput.order_by,
      order: listAllCarCategoriesUseCaseInput.order,
      take: listAllCarCategoriesUseCaseInput.limit,
      skip:
        listAllCarCategoriesUseCaseInput.page *
        listAllCarCategoriesUseCaseInput.limit,
    });
  });

  it('should throw if FindAllCarCategoriesRepository throws', async () => {
    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarCategoriesUseCase.execute(
      listAllCarCategoriesUseCaseInput
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return car categories', async () => {
    const categoriesMock = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockResolvedValueOnce(categoriesMock);

    const categories = await listAllCarCategoriesUseCase.execute(
      listAllCarCategoriesUseCaseInput
    );

    expect(categories).toEqual(categoriesMock);
  });
});
