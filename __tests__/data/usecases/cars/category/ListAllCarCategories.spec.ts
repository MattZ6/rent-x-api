import faker from 'faker';

import { ListAllCarCategoriesUseCase } from '@data/usecases/car/category/ListAllCarCategories';

import { carCategoryMock } from '../../../../domain/models/car-category.mock';
import { FindAllCarCategoriesRepositorySpy } from '../../../mocks';

const defaultLimit = faker.datatype.number({ min: 1, max: 100 });
const defaultPage = faker.datatype.number({ min: 1, max: 50 });
let findAllCarCategoriesRepositorySpy: FindAllCarCategoriesRepositorySpy;

let listAllCarCategoriesUseCase: ListAllCarCategoriesUseCase;

describe('ListAllCarCategoriesUseCase', () => {
  beforeEach(() => {
    findAllCarCategoriesRepositorySpy = new FindAllCarCategoriesRepositorySpy();

    listAllCarCategoriesUseCase = new ListAllCarCategoriesUseCase(
      defaultLimit,
      defaultPage,
      findAllCarCategoriesRepositorySpy
    );
  });

  it('should call FindAllCarCategoriesRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarCategoriesRepositorySpy, 'findAll');

    const limit = faker.datatype.number({ min: 1, max: 100 });
    const page = faker.datatype.number({ min: 1, max: 30 });

    await listAllCarCategoriesUseCase.execute({
      limit,
      page,
    });

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      take: limit,
      skip: page * limit,
    });
  });

  it('should throw if FindAllCarCategoriesRepository throws', async () => {
    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarCategoriesUseCase.execute({
      limit: faker.datatype.number({ min: 1, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 30 }),
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call FindAllCarCategoriesRepository with default limit and page values if not provided', async () => {
    const findAllSpy = jest.spyOn(findAllCarCategoriesRepositorySpy, 'findAll');

    await listAllCarCategoriesUseCase.execute();

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      take: defaultLimit,
      skip: defaultPage * defaultLimit,
    });
  });

  it('should return car categories', async () => {
    const categoriesMock = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(findAllCarCategoriesRepositorySpy, 'findAll')
      .mockResolvedValueOnce(categoriesMock);

    const categories = await listAllCarCategoriesUseCase.execute({
      limit: faker.datatype.number({ min: 1, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 30 }),
    });

    expect(categories).toEqual(categoriesMock);
  });
});
