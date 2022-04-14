import { faker } from '@faker-js/faker';

import {
  CarSpecificationAlreadyExistsWithProvidedNameError,
  CarSpecificationNotFoundWithProvidedIdError,
} from '@domain/errors';

import { UpdateCarSpecificationUseCase } from '@application/usecases/car/specification/UpdateCarSpecification';

import { carSpecificationMock } from '../../../../domain/models/car-specification.mock';
import {
  CheckIfCarSpecificationExistsByNameRepositorySpy,
  FindCarSpecificationByIdRepositorySpy,
  UpdateCarSpecificationRepositorySpy,
  updateCarSpecificationUseCaseInputMock,
} from '../../../mocks';

let findCarSpecificationByIdRepositorySpy: FindCarSpecificationByIdRepositorySpy;
let checkIfCarSpecificationExistsByNameRepositorySpy: CheckIfCarSpecificationExistsByNameRepositorySpy;
let updateCarSpecificationRepositorySpy: UpdateCarSpecificationRepositorySpy;

let updateCarSpecificationUseCase: UpdateCarSpecificationUseCase;

describe('UpdateCarSpecificationUseCase', () => {
  beforeEach(() => {
    findCarSpecificationByIdRepositorySpy =
      new FindCarSpecificationByIdRepositorySpy();
    checkIfCarSpecificationExistsByNameRepositorySpy =
      new CheckIfCarSpecificationExistsByNameRepositorySpy();
    updateCarSpecificationRepositorySpy =
      new UpdateCarSpecificationRepositorySpy();

    updateCarSpecificationUseCase = new UpdateCarSpecificationUseCase(
      findCarSpecificationByIdRepositorySpy,
      checkIfCarSpecificationExistsByNameRepositorySpy,
      updateCarSpecificationRepositorySpy
    );
  });

  it('should call FindCarSpecificationByIdRepository with correct values', async () => {
    const findByIdSpy = jest.spyOn(
      findCarSpecificationByIdRepositorySpy,
      'findById'
    );

    const id = faker.datatype.uuid();

    await updateCarSpecificationUseCase.execute({
      ...updateCarSpecificationUseCaseInputMock,
      id,
    });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({ id });
  });

  it('should throw if FindCarSpecificationByIdRepository throws', async () => {
    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarSpecificationNotFoundWithThisIdError if car specification not exists', async () => {
    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(undefined);

    const promise = updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationNotFoundWithProvidedIdError
    );
  });

  it('should not call CheckIfCarSpecificationExistsByNameRepository if specification name not changed', async () => {
    const name = faker.datatype.string();

    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...carSpecificationMock, name });

    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    await updateCarSpecificationUseCase.execute({
      ...updateCarSpecificationUseCaseInputMock,
      name: `       ${name.toUpperCase()} `,
    });

    expect(checkIfExistsByNameSpy).not.toHaveBeenCalled();
  });

  it('should call CheckIfCarSpecificationExistsByNameRepository once only if specification name has changed', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    await updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    expect(checkIfExistsByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should call CheckIfCarSpecificationExistsByNameRepository with correct values', async () => {
    const checkIfExistsByNameSpy = jest.spyOn(
      checkIfCarSpecificationExistsByNameRepositorySpy,
      'checkIfExistsByName'
    );

    const name = faker.datatype.string();

    await updateCarSpecificationUseCase.execute({
      ...updateCarSpecificationUseCaseInputMock,
      name,
    });

    expect(checkIfExistsByNameSpy).toHaveBeenCalledWith({ name });
  });

  it('should throw if CheckIfCarSpecificationExistsByNameRepository throws', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockRejectedValueOnce(new Error());

    const promise = updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should throw CarSpecificationAlreadyExistsWithThisNameError if already has a specification with same name', async () => {
    jest
      .spyOn(
        checkIfCarSpecificationExistsByNameRepositorySpy,
        'checkIfExistsByName'
      )
      .mockResolvedValueOnce(true);

    const promise = updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toBeInstanceOf(
      CarSpecificationAlreadyExistsWithProvidedNameError
    );
  });

  it('should call UpdateCarSpecificationRepository once with correct values', async () => {
    jest
      .spyOn(findCarSpecificationByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce({ ...carSpecificationMock });

    const updateSpy = jest.spyOn(updateCarSpecificationRepositorySpy, 'update');

    const name = faker.datatype.string();
    const description = faker.datatype.string();

    await updateCarSpecificationUseCase.execute({
      ...updateCarSpecificationUseCaseInputMock,
      name,
      description,
    });

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      ...carSpecificationMock,
      name,
      description,
    });
  });

  it('should throw if UpdateCarSpecificationRepository throws', async () => {
    jest
      .spyOn(updateCarSpecificationRepositorySpy, 'update')
      .mockRejectedValueOnce(new Error());

    const promise = updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    await expect(promise).rejects.toThrow();
  });

  it('should update car specification', async () => {
    const specification = await updateCarSpecificationUseCase.execute(
      updateCarSpecificationUseCaseInputMock
    );

    expect(specification).toHaveProperty(
      'id',
      updateCarSpecificationUseCaseInputMock.id
    );
    expect(specification).toHaveProperty(
      'name',
      updateCarSpecificationUseCaseInputMock.name
    );
    expect(specification).toHaveProperty(
      'description',
      updateCarSpecificationUseCaseInputMock.description
    );
  });
});
