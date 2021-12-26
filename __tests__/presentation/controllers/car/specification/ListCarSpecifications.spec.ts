import faker from 'faker';

import { ListCarSpecificationsController } from '@presentation/controllers/car/specification/ListCarSpecifications';
import { ok } from '@presentation/helpers/http/http';

import { carSpecificationMock } from '../../../../domain/models/car-specification.mock';
import { ListAllCarSpecificationsUseCaseSpy } from '../../../mocks';

const defaultOrderBy = 'created_at';
const defaultOrder = 'DESC';
const defaultLimit = faker.datatype.number({ min: 10, max: 100 });
const defaultPage = faker.datatype.number({ min: 1, max: 50 });
let listAllCarSpecificationsUseCaseSpy: ListAllCarSpecificationsUseCaseSpy;

let listCarSpecificationsController: ListCarSpecificationsController;

const listCarSpecificationsControllerRequest: ListCarSpecificationsController.Request =
  {
    query: {
      order_by: 'name',
      order: 'ASC',
      limit: faker.datatype.number({ min: 10, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 50 }),
    },
  };

describe('ListCarSpecificationsController', () => {
  beforeEach(() => {
    listAllCarSpecificationsUseCaseSpy =
      new ListAllCarSpecificationsUseCaseSpy();

    listCarSpecificationsController = new ListCarSpecificationsController(
      defaultOrderBy,
      defaultOrder,
      defaultLimit,
      defaultPage,
      listAllCarSpecificationsUseCaseSpy
    );
  });

  it('should call ListAllCarSpecificationsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    await listCarSpecificationsController.handle(
      listCarSpecificationsControllerRequest
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarSpecificationsControllerRequest.query.order_by,
      order: listCarSpecificationsControllerRequest.query.order,
      limit: listCarSpecificationsControllerRequest.query.limit,
      page: listCarSpecificationsControllerRequest.query.page,
    });
  });

  it('should call ListAllCarSpecificationsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(
      listAllCarSpecificationsUseCaseSpy,
      'execute'
    );

    const request = {
      ...listCarSpecificationsControllerRequest,
      query: undefined,
    };

    await listCarSpecificationsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: defaultOrderBy,
      order: defaultOrder,
      limit: defaultLimit,
      page: defaultPage,
    });
  });

  it('should throw if ListAllCarSpecificationsUseCase throws', async () => {
    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarSpecificationsController.handle(
      listCarSpecificationsControllerRequest
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const carSpecificatios = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(listAllCarSpecificationsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(carSpecificatios);

    const response = await listCarSpecificationsController.handle(
      listCarSpecificationsControllerRequest
    );

    expect(response).toEqual(ok(carSpecificatios));
  });
});
