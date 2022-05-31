import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { GetCarDetailsUseCase } from '@application/usecases/car/GetDetails';

import { makeCarMock, makeErrorMock } from '../../../domain';
import {
  FindCarByIdRepositorySpy,
  makeGetCarDetailsUseCaseInputMock,
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

    const input = makeGetCarDetailsUseCaseInputMock();

    await getCarDetailsUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: input.id,
      include: {
        brand: true,
        category: true,
        specifications: true,
        images: true,
      },
    });
  });

  it('should throw if FindCarByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeGetCarDetailsUseCaseInputMock();

    const promise = getCarDetailsUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarNotFoundWithProvidedIdError if FindCarByIdRepository returns null', async () => {
    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeGetCarDetailsUseCaseInputMock();

    const promise = getCarDetailsUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should get car data', async () => {
    const carMock = makeCarMock();

    jest
      .spyOn(findCarByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(carMock);

    const input = makeGetCarDetailsUseCaseInputMock();

    const output = await getCarDetailsUseCase.execute(input);

    expect(output).toEqual(carMock);
  });
});
