import faker from 'faker';

import { ListCarCategoriesController } from '@presentation/controllers/car/category/ListCarCategories';
import { ok } from '@presentation/helpers/http/http';

import { carCategoryMock } from '../../../../domain/models/car-category.mock';
import { ListAllCarCategoriesUseCaseSpy } from '../../../mocks';

const defaultOrderBy = 'created_at';
const defaultOrder = 'DESC';
const defaultLimit = faker.datatype.number({ min: 10, max: 100 });
const defaultPage = faker.datatype.number({ min: 1, max: 50 });
let listAllCarCategoriesUseCaseSpy: ListAllCarCategoriesUseCaseSpy;

let listCarCategoriesController: ListCarCategoriesController;

const listCarCategoriesControllerRequest: ListCarCategoriesController.Request =
  {
    query: {
      order_by: faker.random.arrayElement(['name', 'created_at']),
      order: faker.random.arrayElement(['ASC', 'DESC']),
      limit: faker.datatype.number({ min: 10, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 50 }),
    },
  };

describe('ListCarCategoriesController', () => {
  beforeEach(() => {
    listAllCarCategoriesUseCaseSpy = new ListAllCarCategoriesUseCaseSpy();

    listCarCategoriesController = new ListCarCategoriesController(
      defaultOrderBy,
      defaultOrder,
      defaultLimit,
      defaultPage,
      listAllCarCategoriesUseCaseSpy
    );
  });

  it('should call ListAllCarCategoriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    await listCarCategoriesController.handle(
      listCarCategoriesControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarCategoriesControllerRequest.query.order_by,
      order: listCarCategoriesControllerRequest.query.order,
      limit: listCarCategoriesControllerRequest.query.limit,
      page: listCarCategoriesControllerRequest.query.page,
    });
  });

  it('should call ListAllCarCategoriesUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    const request = {
      ...listCarCategoriesControllerRequest,
      query: {},
    };

    await listCarCategoriesController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: defaultOrderBy,
      order: defaultOrder,
      limit: defaultLimit,
      page: defaultPage,
    });
  });

  it('should throw if ListAllCarCategoriesUseCase throws', async () => {
    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarCategoriesController.handle(
      listCarCategoriesControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const categories = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(categories);

    const response = await listCarCategoriesController.handle(
      listCarCategoriesControllerRequest
    );

    expect(response).toEqual(ok(categories));
  });
});
