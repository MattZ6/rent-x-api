import { ListCarCategoriesController } from '@presentation/controllers/car/category/ListCarCategories';
import { ok } from '@presentation/helpers/http';

import { carCategoryMock } from '../../../../domain/entities';
import {
  listCarCategoriesControllerDefaultLimit,
  listCarCategoriesControllerDefaultOrder,
  listCarCategoriesControllerDefaultOrderBy,
  listCarCategoriesControllerDefaultPage,
  ListAllCarCategoriesUseCaseSpy,
  listCarCategoriesControllerRequestMock,
} from '../../../mocks';

let listAllCarCategoriesUseCaseSpy: ListAllCarCategoriesUseCaseSpy;

let listCarCategoriesController: ListCarCategoriesController;

describe('ListCarCategoriesController', () => {
  beforeEach(() => {
    listAllCarCategoriesUseCaseSpy = new ListAllCarCategoriesUseCaseSpy();

    listCarCategoriesController = new ListCarCategoriesController(
      listCarCategoriesControllerDefaultOrderBy,
      listCarCategoriesControllerDefaultOrder,
      listCarCategoriesControllerDefaultLimit,
      listCarCategoriesControllerDefaultPage,
      listAllCarCategoriesUseCaseSpy
    );
  });

  it('should call ListAllCarCategoriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    await listCarCategoriesController.handle(
      listCarCategoriesControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarCategoriesControllerRequestMock.query.order_by,
      order: listCarCategoriesControllerRequestMock.query.order,
      limit: listCarCategoriesControllerRequestMock.query.limit,
      page: listCarCategoriesControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarCategoriesUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    const request = {
      ...listCarCategoriesControllerRequestMock,
      query: undefined,
    };

    await listCarCategoriesController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarCategoriesControllerDefaultOrderBy,
      order: listCarCategoriesControllerDefaultOrder,
      limit: listCarCategoriesControllerDefaultLimit,
      page: listCarCategoriesControllerDefaultPage,
    });
  });

  it('should throw if ListAllCarCategoriesUseCase throws', async () => {
    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarCategoriesController.handle(
      listCarCategoriesControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const categories = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(categories);

    const response = await listCarCategoriesController.handle(
      listCarCategoriesControllerRequestMock
    );

    expect(response).toEqual(ok(categories));
  });
});
