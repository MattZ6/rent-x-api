import { ListCarSpecificationsController } from '@presentation/controllers/car/specification/ListCarSpecifications';
import { ok } from '@presentation/helpers/http';

import { carSpecificationMock } from '../../../../domain/models';
import {
  listCarSpecificationsControllerDefaultLimit,
  listCarSpecificationsControllerDefaultOrder,
  listCarSpecificationsControllerDefaultOrderBy,
  listCarSpecificationsControllerDefaultPage,
  ListAllCarSpecificationsUseCaseSpy,
  listCarSpecificationsControllerRequestMock,
} from '../../../mocks';

let listAllCarSpecificationsUseCaseSpy: ListAllCarSpecificationsUseCaseSpy;

let listCarSpecificationsController: ListCarSpecificationsController;

describe('ListCarSpecificationsController', () => {
  beforeEach(() => {
    listAllCarSpecificationsUseCaseSpy =
      new ListAllCarSpecificationsUseCaseSpy();

    listCarSpecificationsController = new ListCarSpecificationsController(
      listCarSpecificationsControllerDefaultOrderBy,
      listCarSpecificationsControllerDefaultOrder,
      listCarSpecificationsControllerDefaultLimit,
      listCarSpecificationsControllerDefaultPage,
      listAllCarSpecificationsUseCaseSpy
    );
  });

  it('should call ListAllCarSpecificationsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    await listCarSpecificationsController.handle(
      listCarSpecificationsControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarSpecificationsControllerRequestMock.query.order_by,
      order: listCarSpecificationsControllerRequestMock.query.order,
      limit: listCarSpecificationsControllerRequestMock.query.limit,
      page: listCarSpecificationsControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarSpecificationsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    const request = {
      ...listCarSpecificationsControllerRequestMock,
      query: undefined,
    };

    await listCarSpecificationsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarSpecificationsControllerDefaultOrderBy,
      order: listCarSpecificationsControllerDefaultOrder,
      limit: listCarSpecificationsControllerDefaultLimit,
      page: listCarSpecificationsControllerDefaultPage,
    });
  });

  it('should throw if ListAllCarSpecificationsUseCase throws', async () => {
    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarSpecificationsController.handle(
      listCarSpecificationsControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const carSpecifications = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(carSpecifications);

    const response = await listCarSpecificationsController.handle(
      listCarSpecificationsControllerRequestMock
    );

    expect(response).toEqual(ok(carSpecifications));
  });
});
