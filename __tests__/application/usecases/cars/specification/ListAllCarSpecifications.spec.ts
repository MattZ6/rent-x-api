import { ListAllCarSpecificationsUseCase } from '@application/usecases/car/specification/ListAllCarSpecifications';

import { carSpecificationMock } from '../../../../domain/models/car-specification.mock';
import {
  FindAllCarSpecificationsRepositorySpy,
  listAllCarSpecificationsUseCaseInputMock,
} from '../../../mocks';

let findAllCarSpecificationsRepositorySpy: FindAllCarSpecificationsRepositorySpy;

let listAllCarSpecificationsUseCase: ListAllCarSpecificationsUseCase;

describe('ListAllCarSpecificationsUseCase', () => {
  beforeEach(() => {
    findAllCarSpecificationsRepositorySpy =
      new FindAllCarSpecificationsRepositorySpy();

    listAllCarSpecificationsUseCase = new ListAllCarSpecificationsUseCase(
      findAllCarSpecificationsRepositorySpy
    );
  });

  it('should call FindAllCarSpecificationsRepository once with correct values', async () => {
    const findAllSpy = jest.spyOn(
      findAllCarSpecificationsRepositorySpy,
      'findAll'
    );

    await listAllCarSpecificationsUseCase.execute(
      listAllCarSpecificationsUseCaseInputMock
    );

    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({
      order_by: listAllCarSpecificationsUseCaseInputMock.order_by,
      order: listAllCarSpecificationsUseCaseInputMock.order,
      take: listAllCarSpecificationsUseCaseInputMock.limit,
      skip:
        (listAllCarSpecificationsUseCaseInputMock.page - 1) *
        listAllCarSpecificationsUseCaseInputMock.limit,
    });
  });

  it('should throw if FindAllCarSpecificationsRepository throws', async () => {
    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockRejectedValueOnce(new Error());

    const promise = listAllCarSpecificationsUseCase.execute(
      listAllCarSpecificationsUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should return car specifications', async () => {
    const specificationsMock = [carSpecificationMock, carSpecificationMock];

    jest
      .spyOn(findAllCarSpecificationsRepositorySpy, 'findAll')
      .mockResolvedValueOnce(specificationsMock);

    const specifications = await listAllCarSpecificationsUseCase.execute(
      listAllCarSpecificationsUseCaseInputMock
    );

    expect(specifications).toEqual(specificationsMock);
  });
});
