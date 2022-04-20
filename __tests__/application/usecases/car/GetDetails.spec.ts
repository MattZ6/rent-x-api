import { faker } from '@faker-js/faker';

import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarDetailsUseCase } from '@application/usecases/car/GetDetails';

import { carMock } from '../../../domain/entities';
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

    await getCarDetailsUseCase.execute({ id: carId });

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

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should get car data', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carMock);

    const response = await getCarDetailsUseCase.execute({
      id: carMock.id,
    });

    expect(response).toEqual(carMock);
  });
});