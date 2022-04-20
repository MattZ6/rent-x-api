import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ListAllCarsUseCase } from '@application/usecases/car/ListAll';

import { makeCarMock, makeErrorMock } from '../../../domain';
import {
  FindAllCarsRepositorySpy,
  makeListAllCarsUseCaseDefaultLimitMock,
  makeListAllCarsUseCaseDefaultOffsetMock,
  makeListAllCarsUseCaseDefaultOrderByMock,
  makeListAllCarsUseCaseDefaultSortByMock,
  makeListAllCarsUseCaseInputMock,
} from '../../mocks';

let listAllCarsUseCaseDefaultSortByMock: IListAllCarsUseCase.SortBy;
let listAllCarsUseCaseDefaultOrderByMock: IListAllCarsUseCase.OrderBy;
let listAllCarsUseCaseDefaultLimitMock: IListAllCarsUseCase.Limit;
let listAllCarsUseCaseDefaultOffsetMock: IListAllCarsUseCase.Offset;
let findAllCarsRepositorySpy: FindAllCarsRepositorySpy;

let listAllCarsUseCase: ListAllCarsUseCase;

describe('ListAllCarsUseCase', () => {
  beforeEach(() => {
    listAllCarsUseCaseDefaultSortByMock =
      makeListAllCarsUseCaseDefaultSortByMock();
    listAllCarsUseCaseDefaultOrderByMock =
      makeListAllCarsUseCaseDefaultOrderByMock();
    listAllCarsUseCaseDefaultLimitMock =
      makeListAllCarsUseCaseDefaultLimitMock();
    listAllCarsUseCaseDefaultOffsetMock =
      makeListAllCarsUseCaseDefaultOffsetMock();
    findAllCarsRepositorySpy = new FindAllCarsRepositorySpy();

    listAllCarsUseCase = new ListAllCarsUseCase(
      listAllCarsUseCaseDefaultSortByMock,
      listAllCarsUseCaseDefaultOrderByMock,
      listAllCarsUseCaseDefaultLimitMock,
      listAllCarsUseCaseDefaultOffsetMock,
      findAllCarsRepositorySpy
    );
  });

  it('should call FindAllCarsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarsRepositorySpy, 'findAll');

    const input = makeListAllCarsUseCaseInputMock();

    await listAllCarsUseCase.execute(input);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: input.sort_by,
      order_by: input.order_by,
      take: input.limit,
      skip: input.offset,
      brand_id: input.brand_id,
      category_id: input.category_id,
      include: {
        brand: true,
        category: true,
      },
    });
  });

  it('should call FindAllCarsRepository with default values if no input', async () => {
    const findAllSpy = jest.spyOn(findAllCarsRepositorySpy, 'findAll');

    await listAllCarsUseCase.execute({});

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: listAllCarsUseCaseDefaultSortByMock,
      order_by: listAllCarsUseCaseDefaultOrderByMock,
      take: listAllCarsUseCaseDefaultLimitMock,
      skip: listAllCarsUseCaseDefaultOffsetMock,
      include: {
        brand: true,
        category: true,
      },
    });
  });

  it('should throw if FindAllCarsRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllCarsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllCarsUseCaseInputMock();

    const promise = listAllCarsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Cars on success', async () => {
    const carsMock = [makeCarMock(), makeCarMock(), makeCarMock()];

    jest
      .spyOn(findAllCarsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(carsMock);

    const input = makeListAllCarsUseCaseInputMock();

    const output = await listAllCarsUseCase.execute(input);

    expect(output).toEqual(carsMock);
  });
});
