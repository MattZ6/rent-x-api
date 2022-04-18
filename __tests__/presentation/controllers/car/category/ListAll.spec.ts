import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';
import { ok } from '@presentation/helpers/http';

import { carCategoryMock } from '../../../../domain/entities';
import {
  listAllCarCategoriesControllerDefaultLimit,
  listAllCarCategoriesControllerDefaultOrder,
  listAllCarCategoriesControllerDefaultOrderBy,
  listAllCarCategoriesControllerDefaultPage,
  ListAllCarCategoriesUseCaseSpy,
  listAllCarCategoriesControllerRequestMock,
} from '../../../mocks';

let listAllCarCategoriesUseCaseSpy: ListAllCarCategoriesUseCaseSpy;

let listAllCarCategoriesController: ListAllCarCategoriesController;

describe('ListAllCarCategoriesController', () => {
  beforeEach(() => {
    listAllCarCategoriesUseCaseSpy = new ListAllCarCategoriesUseCaseSpy();

    listAllCarCategoriesController = new ListAllCarCategoriesController(
      listAllCarCategoriesControllerDefaultOrderBy,
      listAllCarCategoriesControllerDefaultOrder,
      listAllCarCategoriesControllerDefaultLimit,
      listAllCarCategoriesControllerDefaultPage,
      listAllCarCategoriesUseCaseSpy
    );
  });

  it('should call ListAllCarCategoriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    await listAllCarCategoriesController.handle(
      listAllCarCategoriesControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarCategoriesControllerRequestMock.query.order_by,
      order: listAllCarCategoriesControllerRequestMock.query.order,
      limit: listAllCarCategoriesControllerRequestMock.query.limit,
      page: listAllCarCategoriesControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarCategoriesUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    const request = {
      ...listAllCarCategoriesControllerRequestMock,
      query: undefined,
    };

    await listAllCarCategoriesController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarCategoriesControllerDefaultOrderBy,
      order: listAllCarCategoriesControllerDefaultOrder,
      limit: listAllCarCategoriesControllerDefaultLimit,
      page: listAllCarCategoriesControllerDefaultPage,
    });
  });

  it('should throw if ListAllCarCategoriesUseCase throws', async () => {
    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarCategoriesController.handle(
      listAllCarCategoriesControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const categories = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(categories);

    const response = await listAllCarCategoriesController.handle(
      listAllCarCategoriesControllerRequestMock
    );

    expect(response).toEqual(ok(categories));
  });
});
