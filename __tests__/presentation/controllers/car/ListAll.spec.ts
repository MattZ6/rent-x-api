import { ListAllCarsController } from '@presentation/controllers/car/ListAll';
import { ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ListAllCarsUseCaseSpy,
  makeListAllCarsControllerRequestMock,
  makeListAllCarsUseCaseOutputMock,
} from '../../mocks';

let listAllCarsUseCaseSpy: ListAllCarsUseCaseSpy;

let listAllCarsController: ListAllCarsController;

describe('ListAllCarsController', () => {
  beforeEach(() => {
    listAllCarsUseCaseSpy = new ListAllCarsUseCaseSpy();

    listAllCarsController = new ListAllCarsController(listAllCarsUseCaseSpy);
  });

  it('should call ListAllCarsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    const request = makeListAllCarsControllerRequestMock();

    await listAllCarsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
      brand_id: request.query.brand_id,
      category_id: request.query.category_id,
    });
  });

  it('should throw if ListAllCarsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllCarsControllerRequestMock();

    const promise = listAllCarsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllCarsUseCaseOutputMock();

    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllCarsControllerRequestMock();

    const response = await listAllCarsController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
