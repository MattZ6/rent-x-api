import { ListCarsController } from '@presentation/controllers/car/ListCars';
import { ok } from '@presentation/helpers/http/http';

import { carMock } from '../../../domain/models/car.mock';
import {
  listCarsControllerDefaultLimit,
  listCarsControllerDefaultOrder,
  listCarsControllerDefaultOrderBy,
  listCarsControllerDefaultPage,
  ListAllCarsUseCaseSpy,
  listCarsControllerRequestMock,
} from '../../mocks';

let listAllCarsUseCaseSpy: ListAllCarsUseCaseSpy;

let listCarsController: ListCarsController;

describe('ListCarsController', () => {
  beforeEach(() => {
    listAllCarsUseCaseSpy = new ListAllCarsUseCaseSpy();

    listCarsController = new ListCarsController(
      listCarsControllerDefaultOrderBy,
      listCarsControllerDefaultOrder,
      listCarsControllerDefaultLimit,
      listCarsControllerDefaultPage,
      listAllCarsUseCaseSpy
    );
  });

  it('should call ListAllCarsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    await listCarsController.handle(listCarsControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarsControllerRequestMock.query.order_by,
      order: listCarsControllerRequestMock.query.order,
      limit: listCarsControllerRequestMock.query.limit,
      page: listCarsControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    const request = {
      ...listCarsControllerRequestMock,
      query: undefined,
    };

    await listCarsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarsControllerDefaultOrderBy,
      order: listCarsControllerDefaultOrder,
      limit: listCarsControllerDefaultLimit,
      page: listCarsControllerDefaultPage,
    });
  });

  it('should throw if ListAllCarsUseCase throws', async () => {
    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarsController.handle(listCarsControllerRequestMock);

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const cars = [carMock, carMock];

    jest.spyOn(listAllCarsUseCaseSpy, 'execute').mockResolvedValueOnce(cars);

    const response = await listCarsController.handle(
      listCarsControllerRequestMock
    );

    expect(response).toEqual(ok(cars));
  });
});
