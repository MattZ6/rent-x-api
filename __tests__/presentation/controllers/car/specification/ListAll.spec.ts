import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';
import { ok } from '@presentation/helpers/http';

import { carSpecificationMock } from '../../../../domain/entities';
import {
  listAllCarSpecificationsControllerDefaultLimit,
  listAllCarSpecificationsControllerDefaultOrder,
  listAllCarSpecificationsControllerDefaultOrderBy,
  listAllCarSpecificationsControllerDefaultPage,
  ListAllCarSpecificationsUseCaseSpy,
  listAllCarSpecificationsControllerRequestMock,
} from '../../../mocks';

let listAllCarSpecificationsUseCaseSpy: ListAllCarSpecificationsUseCaseSpy;

let listAllCarSpecificationsController: ListAllCarSpecificationsController;

describe('ListAllCarSpecificationsController', () => {
  beforeEach(() => {
    listAllCarSpecificationsUseCaseSpy =
      new ListAllCarSpecificationsUseCaseSpy();

    listAllCarSpecificationsController = new ListAllCarSpecificationsController(
      listAllCarSpecificationsControllerDefaultOrderBy,
      listAllCarSpecificationsControllerDefaultOrder,
      listAllCarSpecificationsControllerDefaultLimit,
      listAllCarSpecificationsControllerDefaultPage,
      listAllCarSpecificationsUseCaseSpy
    );
  });

  it('should call ListAllCarSpecificationsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    await listAllCarSpecificationsController.handle(
      listAllCarSpecificationsControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarSpecificationsControllerRequestMock.query.order_by,
      order: listAllCarSpecificationsControllerRequestMock.query.order,
      limit: listAllCarSpecificationsControllerRequestMock.query.limit,
      page: listAllCarSpecificationsControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarSpecificationsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    const request = {
      ...listAllCarSpecificationsControllerRequestMock,
      query: undefined,
    };

    await listAllCarSpecificationsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarSpecificationsControllerDefaultOrderBy,
      order: listAllCarSpecificationsControllerDefaultOrder,
      limit: listAllCarSpecificationsControllerDefaultLimit,
      page: listAllCarSpecificationsControllerDefaultPage,
    });
  });

  it('should throw if ListAllCarSpecificationsUseCase throws', async () => {
    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarSpecificationsController.handle(
      listAllCarSpecificationsControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const carSpecifications = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(carSpecifications);

    const response = await listAllCarSpecificationsController.handle(
      listAllCarSpecificationsControllerRequestMock
    );

    expect(response).toEqual(ok(carSpecifications));
  });
});
