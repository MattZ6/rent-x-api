import faker from 'faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAllCars';

import { ListAllCarsUseCase } from '@data/usecases/car/ListAllCars';

import { carMock } from '../../../domain/models/car.mock';
import { FindAllCarsRepositorySpy } from '../../mocks';

let findAllCarsRepositorySpy: FindAllCarsRepositorySpy;

let listAllCarsUseCase: ListAllCarsUseCase;

const listAllCarsUseCaseInputMock: IListAllCarsUseCase.Input = {
  order_by: faker.random.arrayElement([
    'name',
    'created_at',
    'horse_power',
    'number_of_seats',
    'max_speed',
  ]),
  order: faker.random.arrayElement(['ASC', 'DESC']),
  page: faker.datatype.number({ min: 1, max: 50 }),
  limit: faker.datatype.number({ min: 10, max: 1000 }),
};

describe('ListAllCarsUseCase', () => {
  beforeEach(() => {
    findAllCarsRepositorySpy = new FindAllCarsRepositorySpy();

    listAllCarsUseCase = new ListAllCarsUseCase(findAllCarsRepositorySpy);
  });

  it('should call FindAllCarsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(findAllCarsRepositorySpy, 'findAll');

    await listAllCarsUseCase.execute(listAllCarsUseCaseInputMock);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarsUseCaseInputMock.order_by,
      order: listAllCarsUseCaseInputMock.order,
      take: listAllCarsUseCaseInputMock.limit,
      skip:
        listAllCarsUseCaseInputMock.limit *
        (listAllCarsUseCaseInputMock.page - 1),
      relations: ['brand', 'category'],
    });
  });

  it('should throw if FindAllCarsRepository throws', async () => {
    jest
      .spyOn(findAllCarsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarsUseCase.execute(listAllCarsUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should call FindAllCarsRepository with skip zero if provided page value is less than or equal to zero', async () => {
    const findAllSpy = jest.spyOn(findAllCarsRepositorySpy, 'findAll');

    await listAllCarsUseCase.execute({
      ...listAllCarsUseCaseInputMock,
      page: faker.datatype.number({ min: -100, max: 0 }),
    });

    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarsUseCaseInputMock.order_by,
      order: listAllCarsUseCaseInputMock.order,
      take: listAllCarsUseCaseInputMock.limit,
      skip: 0,
      relations: ['brand', 'category'],
    });
  });

  it('should return cars list', async () => {
    const cars = [carMock, carMock, carMock, carMock];

    jest.spyOn(findAllCarsRepositorySpy, 'findAll').mockResolvedValueOnce(cars);

    const response = await listAllCarsUseCase.execute(
      listAllCarsUseCaseInputMock
    );

    expect(response).toEqual(cars);
  });
});
