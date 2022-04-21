import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';
import { ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllCarCategoriesUseCaseSpy,
  makeListAllCarCategoriesControllerRequestMock,
  makeListAllCarCategoriesUseCaseOutputMock,
} from '../../../mocks';

let listAllCarCategoriesUseCaseSpy: ListAllCarCategoriesUseCaseSpy;

let listAllCarCategoriesController: ListAllCarCategoriesController;

describe('ListAllCarCategoriesController', () => {
  beforeEach(() => {
    listAllCarCategoriesUseCaseSpy = new ListAllCarCategoriesUseCaseSpy();

    listAllCarCategoriesController = new ListAllCarCategoriesController(
      listAllCarCategoriesUseCaseSpy
    );
  });

  it('should call ListAllCarCategoriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarCategoriesUseCaseSpy, 'execute');

    const request = makeListAllCarCategoriesControllerRequestMock();

    await listAllCarCategoriesController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
    });
  });

  it('should throw if ListAllCarCategoriesUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllCarCategoriesControllerRequestMock();

    const promise = listAllCarCategoriesController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllCarCategoriesUseCaseOutputMock();

    jest
      .spyOn(listAllCarCategoriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllCarCategoriesControllerRequestMock();

    const response = await listAllCarCategoriesController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
