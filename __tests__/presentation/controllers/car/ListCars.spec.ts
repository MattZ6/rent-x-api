import faker from 'faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAllCars';

import { ListCarsController } from '@presentation/controllers/car/ListCars';
import { ok } from '@presentation/helpers/http/http';

import { carMock } from '../../../domain/models/car.mock';
import { ListAllCarsUseCaseSpy } from '../../mocks';

const defaultOrderBy: IListAllCarsUseCase.OrderBy = faker.random.arrayElement([
  'name',
  'created_at',
  'horse_power',
  'number_of_seats',
  'max_speed',
]);
const defaultOrder: IListAllCarsUseCase.Order = faker.random.arrayElement([
  'ASC',
  'DESC',
]);
const defaultLimit = faker.datatype.number({ min: 10, max: 100 });
const defaultPage = faker.datatype.number({ min: 1, max: 50 });
let listAllCarsUseCaseSpy: ListAllCarsUseCaseSpy;

let listCarsController: ListCarsController;

const listCarsControllerRequest: ListCarsController.Request = {
  query: {
    order_by: faker.random.arrayElement([
      'name',
      'created_at',
      'horse_power',
      'number_of_seats',
      'max_speed',
    ]),
    order: faker.random.arrayElement(['ASC', 'DESC']),
    limit: faker.datatype.number({ min: 10, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 50 }),
  },
};

describe('ListCarsController', () => {
  beforeEach(() => {
    listAllCarsUseCaseSpy = new ListAllCarsUseCaseSpy();

    listCarsController = new ListCarsController(
      defaultOrderBy,
      defaultOrder,
      defaultLimit,
      defaultPage,
      listAllCarsUseCaseSpy
    );
  });

  it('should call ListAllCarsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    await listCarsController.handle(listCarsControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarsControllerRequest.query.order_by,
      order: listCarsControllerRequest.query.order,
      limit: listCarsControllerRequest.query.limit,
      page: listCarsControllerRequest.query.page,
    });
  });

  it('should call ListAllCarsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarsUseCaseSpy, 'execute');

    const request = {
      ...listCarsControllerRequest,
      query: undefined,
    };

    await listCarsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: defaultOrderBy,
      order: defaultOrder,
      limit: defaultLimit,
      page: defaultPage,
    });
  });

  it('should throw if ListAllCarsUseCase throws', async () => {
    jest
      .spyOn(listAllCarsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarsController.handle(listCarsControllerRequest);

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const cars = [carMock, carMock];

    jest.spyOn(listAllCarsUseCaseSpy, 'execute').mockResolvedValueOnce(cars);

    const response = await listCarsController.handle(listCarsControllerRequest);

    expect(response).toEqual(ok(cars));
  });
});
