import faker from 'faker';

import { CarNotFoundWithThisIdError } from '@domain/errors';

import { GetCarDetailsUseCase } from '@data/usecases/car/GetCarDetails';

import { carMock } from '../../../domain/models/car.mock';
import {
  FindCarByIdRepositorySpy,
  getCarDetailsUseCaseInputMock,
} from '../../mocks';

let findCarByIdRepositorySpy: FindCarByIdRepositorySpy;

let getCarDetailsUseCase: GetCarDetailsUseCase;

describe('GetCarDetailsUseCase', () => {
  beforeEach(() => {
    findCarByIdRepositorySpy = new FindCarByIdRepositorySpy();

    getCarDetailsUseCase = new GetCarDetailsUseCase(findCarByIdRepositorySpy);
  });

  it('should call FindCarByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findCarByIdRepositorySpy, 'findById');

    const carId = faker.datatype.uuid();

    await getCarDetailsUseCase.execute({ car_id: carId });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: carId,
      relations: ['brand', 'category', 'specifications'],
    });
  });

  it('should throw if FindCarByIdRepository throws', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = getCarDetailsUseCase.execute(getCarDetailsUseCaseInputMock);

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarNotFoundWithThisIdError if car not exists', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = getCarDetailsUseCase.execute(getCarDetailsUseCaseInputMock);

    await expect(promise).rejects.toBeInstanceOf(CarNotFoundWithThisIdError);
  });

  it('should get car data', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carMock);

    const response = await getCarDetailsUseCase.execute({
      car_id: carMock.id,
    });

    expect(response).toEqual(carMock);
  });
});
