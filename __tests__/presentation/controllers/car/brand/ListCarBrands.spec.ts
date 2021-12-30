import faker from 'faker';

import { ListCarBrandsController } from '@presentation/controllers/car/brand/ListCarBrands';
import { ok } from '@presentation/helpers/http/http';

import { carCategoryMock } from '../../../../domain/models/car-category.mock';
import { ListAllCarBrandsUseCaseSpy } from '../../../mocks';

const defaultOrderBy = 'created_at';
const defaultOrder = 'DESC';
const defaultLimit = faker.datatype.number({ min: 10, max: 100 });
const defaultPage = faker.datatype.number({ min: 1, max: 50 });
let listAllCarBrandsUseCaseSpy: ListAllCarBrandsUseCaseSpy;

let listCarBrandsController: ListCarBrandsController;

const listCarBrandsControllerRequest: ListCarBrandsController.Request = {
  query: {
    order_by: faker.random.arrayElement(['name', 'created_at']),
    order: faker.random.arrayElement(['ASC', 'DESC']),
    limit: faker.datatype.number({ min: 10, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 50 }),
  },
};

describe('ListCarBrandsController', () => {
  beforeEach(() => {
    listAllCarBrandsUseCaseSpy = new ListAllCarBrandsUseCaseSpy();

    listCarBrandsController = new ListCarBrandsController(
      defaultOrderBy,
      defaultOrder,
      defaultLimit,
      defaultPage,
      listAllCarBrandsUseCaseSpy
    );
  });

  it('should call ListAllCarBrandsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    await listCarBrandsController.handle(listCarBrandsControllerRequest);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarBrandsControllerRequest.query.order_by,
      order: listCarBrandsControllerRequest.query.order,
      limit: listCarBrandsControllerRequest.query.limit,
      page: listCarBrandsControllerRequest.query.page,
    });
  });

  it('should call ListAllCarBrandsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    const request = {
      ...listCarBrandsControllerRequest,
      query: {},
    };

    await listCarBrandsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: defaultOrderBy,
      order: defaultOrder,
      limit: defaultLimit,
      page: defaultPage,
    });
  });

  it('should throw if ListAllCarBrandsUseCase throws', async () => {
    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarBrandsController.handle(
      listCarBrandsControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const categories = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(categories);

    const response = await listCarBrandsController.handle(
      listCarBrandsControllerRequest
    );

    expect(response).toEqual(ok(categories));
  });
});
