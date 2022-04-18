import { faker } from '@faker-js/faker';

import { ListAllCarsUseCase } from '@application/usecases/car/ListAll';

import { carMock } from '../../../domain/models';
import {
  FindAllCarsRepositorySpy,
  listAllCarsUseCaseInputMock,
} from '../../mocks';

let findAllCarsRepositorySpy: FindAllCarsRepositorySpy;

let listAllCarsUseCase: ListAllCarsUseCase;

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
