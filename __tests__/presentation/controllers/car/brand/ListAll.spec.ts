import { ListCarBrandsController } from '@presentation/controllers/car/brand/ListCarBrands';
import { ok } from '@presentation/helpers/http';

import { carCategoryMock } from '../../../../domain/models/car/car-category.mock';
import {
  listCarBrandsControllerDefaultLimitMock,
  listCarBrandsControllerDefaultOrderMock,
  listCarBrandsControllerDefaultOrderByMock,
  listCarBrandsControllerDefaultPageMock,
  ListAllCarBrandsUseCaseSpy,
  listCarBrandsControllerRequestMock,
} from '../../../mocks';

let listAllCarBrandsUseCaseSpy: ListAllCarBrandsUseCaseSpy;

let listCarBrandsController: ListCarBrandsController;

describe('ListCarBrandsController', () => {
  beforeEach(() => {
    listAllCarBrandsUseCaseSpy = new ListAllCarBrandsUseCaseSpy();

    listCarBrandsController = new ListCarBrandsController(
      listCarBrandsControllerDefaultOrderByMock,
      listCarBrandsControllerDefaultOrderMock,
      listCarBrandsControllerDefaultLimitMock,
      listCarBrandsControllerDefaultPageMock,
      listAllCarBrandsUseCaseSpy
    );
  });

  it('should call ListAllCarBrandsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    await listCarBrandsController.handle(listCarBrandsControllerRequestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarBrandsControllerRequestMock.query.order_by,
      order: listCarBrandsControllerRequestMock.query.order,
      limit: listCarBrandsControllerRequestMock.query.limit,
      page: listCarBrandsControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarBrandsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    const request = {
      ...listCarBrandsControllerRequestMock,
      query: undefined,
    };

    await listCarBrandsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listCarBrandsControllerDefaultOrderByMock,
      order: listCarBrandsControllerDefaultOrderMock,
      limit: listCarBrandsControllerDefaultLimitMock,
      page: listCarBrandsControllerDefaultPageMock,
    });
  });

  it('should throw if ListAllCarBrandsUseCase throws', async () => {
    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listCarBrandsController.handle(
      listCarBrandsControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const categories = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(categories);

    const response = await listCarBrandsController.handle(
      listCarBrandsControllerRequestMock
    );

    expect(response).toEqual(ok(categories));
  });
});
