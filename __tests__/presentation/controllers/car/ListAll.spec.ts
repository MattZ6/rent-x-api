import { ListAllCarsController } from '@presentation/controllers/car/ListAll';
import { ok } from '@presentation/helpers/http';

import { carMock } from '../../../domain/entities';
import {
  listAllCarsControllerDefaultLimit,
  listAllCarsControllerDefaultOrder,
  listAllCarsControllerDefaultOrderBy,
  listAllCarsControllerDefaultPage,
  ListAllCarsUseCaseSpy,
  listAllCarsControllerRequestMock,
} from '../../mocks';

let listAllCarsUseCaseSpy: ListAllCarsUseCaseSpy;

let listAllCarsController: ListAllCarsController;

describe('ListAllCarsController', () => {
  beforeEach(() => {
    listAllCarsUseCaseSpy = new ListAllCarsUseCaseSpy();

    listAllCarsController = new ListAllCarsController(
      listAllCarsControllerDefaultOrderBy,
      listAllCarsControllerDefaultOrder,
      listAllCarsControllerDefaultLimit,
      listAllCarsControllerDefaultPage,
      listAllCarsUseCaseSpy
    );
  });

  it('should call ListAllCarsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    await listAllCarsController.handle(listAllCarsControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarsControllerRequestMock.query.sort_by,
      order: listAllCarsControllerRequestMock.query.order_by,
      limit: listAllCarsControllerRequestMock.query.limit,
      page: listAllCarsControllerRequestMock.query.offset,
    });
  });

  it('should call ListAllCarsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    const request = {
      ...listAllCarsControllerRequestMock,
      query: undefined,
    };

    await listAllCarsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarsControllerDefaultOrderBy,
      order: listAllCarsControllerDefaultOrder,
      limit: listAllCarsControllerDefaultLimit,
      page: listAllCarsControllerDefaultPage,
    });
  });

  it('should throw if ListAllCarsUseCase throws', async () => {
    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarsController.handle(
      listAllCarsControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const cars = [carMock, carMock];

    jest.spyOn(listAllCarsUseCaseSpy, 'execute').mockResolvedValueOnce(cars);

    const response = await listAllCarsController.handle(
      listAllCarsControllerRequestMock
    );

    expect(response).toEqual(ok(cars));
  });
});
