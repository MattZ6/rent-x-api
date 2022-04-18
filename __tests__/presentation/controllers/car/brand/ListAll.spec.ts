import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';
import { ok } from '@presentation/helpers/http';

import { carCategoryMock } from '../../../../domain/entities';
import {
  listAllCarBrandsControllerDefaultLimitMock,
  listAllCarBrandsControllerDefaultOrderMock,
  listAllCarBrandsControllerDefaultOrderByMock,
  listAllCarBrandsControllerDefaultPageMock,
  ListAllCarBrandsUseCaseSpy,
  listAllCarBrandsControllerRequestMock,
} from '../../../mocks';

let listAllCarBrandsUseCaseSpy: ListAllCarBrandsUseCaseSpy;

let listAllCarBrandsController: ListAllCarBrandsController;

describe('ListAllCarBrandsController', () => {
  beforeEach(() => {
    listAllCarBrandsUseCaseSpy = new ListAllCarBrandsUseCaseSpy();

    listAllCarBrandsController = new ListAllCarBrandsController(
      listAllCarBrandsControllerDefaultOrderByMock,
      listAllCarBrandsControllerDefaultOrderMock,
      listAllCarBrandsControllerDefaultLimitMock,
      listAllCarBrandsControllerDefaultPageMock,
      listAllCarBrandsUseCaseSpy
    );
  });

  it('should call ListAllCarBrandsUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    await listAllCarBrandsController.handle(
      listAllCarBrandsControllerRequestMock
    );

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarBrandsControllerRequestMock.query.order_by,
      order: listAllCarBrandsControllerRequestMock.query.order,
      limit: listAllCarBrandsControllerRequestMock.query.limit,
      page: listAllCarBrandsControllerRequestMock.query.page,
    });
  });

  it('should call ListAllCarBrandsUseCase with default values if query params not provided', async () => {
    const executeSpy = jest.spyOn(listAllCarBrandsUseCaseSpy, 'execute');

    const request = {
      ...listAllCarBrandsControllerRequestMock,
      query: undefined,
    };

    await listAllCarBrandsController.handle(request);

    expect(executeSpy).toHaveBeenCalledWith({
      order_by: listAllCarBrandsControllerDefaultOrderByMock,
      order: listAllCarBrandsControllerDefaultOrderMock,
      limit: listAllCarBrandsControllerDefaultLimitMock,
      page: listAllCarBrandsControllerDefaultPageMock,
    });
  });

  it('should throw if ListAllCarBrandsUseCase throws', async () => {
    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarBrandsController.handle(
      listAllCarBrandsControllerRequestMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return ok (200) on success', async () => {
    const categories = [carCategoryMock, carCategoryMock];

    jest
      .spyOn(listAllCarBrandsUseCaseSpy, 'execute')
      .mockResolvedValueOnce(categories);

    const response = await listAllCarBrandsController.handle(
      listAllCarBrandsControllerRequestMock
    );

    expect(response).toEqual(ok(categories));
  });
});
