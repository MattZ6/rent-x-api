import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';
import { ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../../domain';
import {
  ListAllCarSpecificationsUseCaseSpy,
  makeListAllCarSpecificationsControllerRequestMock,
  makeListAllCarSpecificationsUseCaseOutputMock,
} from '../../../mocks';

let listAllCarSpecificationsUseCaseSpy: ListAllCarSpecificationsUseCaseSpy;

let listAllCarSpecificationsController: ListAllCarSpecificationsController;

describe('ListAllCarSpecificationsController', () => {
  beforeEach(() => {
    listAllCarSpecificationsUseCaseSpy =
      new ListAllCarSpecificationsUseCaseSpy();

    listAllCarSpecificationsController = new ListAllCarSpecificationsController(
      listAllCarSpecificationsUseCaseSpy
    );
  });

  it('should call ListAllCarSpecificationsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    const request = makeListAllCarSpecificationsControllerRequestMock();

    await listAllCarSpecificationsController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: request.query.sort_by,
      order_by: request.query.order_by,
      limit: request.query.limit,
      offset: request.query.offset,
    });
  });

  it('should throw if ListAllCarSpecificationsUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeListAllCarSpecificationsControllerRequestMock();

    const promise = listAllCarSpecificationsController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeListAllCarSpecificationsUseCaseOutputMock();

    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeListAllCarSpecificationsControllerRequestMock();

    const response = await listAllCarSpecificationsController.handle(request);

    expect(response).toEqual(ok(outputMock));
  });
});
