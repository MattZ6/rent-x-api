import { IListAllAvailableCarsUseCase } from '@domain/usecases/car/ListAllAvailable';

import { ListAllAvailableCarsUseCase } from '@application/usecases/car/ListAllAvailable';

import { makeCarMock, makeErrorMock } from '../../../domain';
import {
  FindAllAvailableCarsRepositorySpy,
  makeListAllAvailableCarsUseCaseDefaultLimitMock,
  makeListAllAvailableCarsUseCaseDefaultOffsetMock,
  makeListAllAvailableCarsUseCaseDefaultOrderByMock,
  makeListAllAvailableCarsUseCaseDefaultSortByMock,
  makeListAllAvailableCarsUseCaseInputMock,
} from '../../mocks';

let listAllAvailableCarsUseCaseDefaultSortByMock: IListAllAvailableCarsUseCase.SortBy;
let listAllAvailableCarsUseCaseDefaultOrderByMock: IListAllAvailableCarsUseCase.OrderBy;
let listAllAvailableCarsUseCaseDefaultLimitMock: IListAllAvailableCarsUseCase.Limit;
let listAllAvailableCarsUseCaseDefaultOffsetMock: IListAllAvailableCarsUseCase.Offset;
let findAllAvailableCarsRepositorySpy: FindAllAvailableCarsRepositorySpy;

let listAllAvailableCarsUseCase: ListAllAvailableCarsUseCase;

describe('ListAllAvailableCarsUseCase', () => {
  beforeEach(() => {
    listAllAvailableCarsUseCaseDefaultSortByMock =
      makeListAllAvailableCarsUseCaseDefaultSortByMock();
    listAllAvailableCarsUseCaseDefaultOrderByMock =
      makeListAllAvailableCarsUseCaseDefaultOrderByMock();
    listAllAvailableCarsUseCaseDefaultLimitMock =
      makeListAllAvailableCarsUseCaseDefaultLimitMock();
    listAllAvailableCarsUseCaseDefaultOffsetMock =
      makeListAllAvailableCarsUseCaseDefaultOffsetMock();
    findAllAvailableCarsRepositorySpy = new FindAllAvailableCarsRepositorySpy();

    listAllAvailableCarsUseCase = new ListAllAvailableCarsUseCase(
      listAllAvailableCarsUseCaseDefaultSortByMock,
      listAllAvailableCarsUseCaseDefaultOrderByMock,
      listAllAvailableCarsUseCaseDefaultLimitMock,
      listAllAvailableCarsUseCaseDefaultOffsetMock,
      findAllAvailableCarsRepositorySpy
    );
  });

  it('should call FindAllCarsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(
      findAllAvailableCarsRepositorySpy,
      'findAllAvailable'
    );

    const input = makeListAllAvailableCarsUseCaseInputMock();

    await listAllAvailableCarsUseCase.execute(input);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      sort_by: input.sort_by,
      order_by: input.order_by,
      take: input.limit,
      skip: input.offset,
      brand_id: input.brand_id,
      category_id: input.category_id,
      transmission_type: input.transmission_type,
      type_of_fuel: input.type_of_fuel,
      min_daily_rate: input.min_daily_rate,
      max_daily_rate: input.max_daily_rate,
      start_date: input.start_date,
      end_date: input.end_date,
      search: input.search,
      include: {
        brand: true,
        category: true,
      },
    });
  });

  it('should call FindAllCarsRepository with default values if no input', async () => {
    const findAllSpy = jest.spyOn(
      findAllAvailableCarsRepositorySpy,
      'findAllAvailable'
    );

    const input = makeListAllAvailableCarsUseCaseInputMock();

    await listAllAvailableCarsUseCase.execute({
      start_date: input.start_date,
      end_date: input.end_date,
    });

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      start_date: input.start_date,
      end_date: input.end_date,
      sort_by: listAllAvailableCarsUseCaseDefaultSortByMock,
      order_by: listAllAvailableCarsUseCaseDefaultOrderByMock,
      take: listAllAvailableCarsUseCaseDefaultLimitMock,
      skip: listAllAvailableCarsUseCaseDefaultOffsetMock,
      include: {
        brand: true,
        category: true,
      },
    });
  });

  it('should throw if FindAllAvailableCarsRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllAvailableCarsRepositorySpy, 'findAllAvailable')
      .mockRejectedValueOnce(errorMock);

    const input = makeListAllAvailableCarsUseCaseInputMock();

    const promise = listAllAvailableCarsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Cars on success', async () => {
    const carsMock = [makeCarMock(), makeCarMock(), makeCarMock()];

    jest
      .spyOn(findAllAvailableCarsRepositorySpy, 'findAllAvailable')
      .mockResolvedValueOnce(carsMock);

    const input = makeListAllAvailableCarsUseCaseInputMock();

    const output = await listAllAvailableCarsUseCase.execute(input);

    expect(output).toEqual(carsMock);
  });
});
