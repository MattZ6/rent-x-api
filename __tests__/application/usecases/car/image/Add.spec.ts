import { CarNotFoundWithProvidedIdError } from '@domain/errors';

import { AddImagesToCarUseCase } from '@application/usecases/car/image/Add';

import { makeCarImageMock, makeErrorMock } from '../../../../domain';
import {
  CheckIfCarExistsByIdRepositorySpy,
  CreateCarImageRepositorySpy,
  makeAddImagesToCarUseCaseInputMock,
  makeUpdateUserAvatarUseCaseAvatarPathMock,
  StoreFileProviderSpy,
} from '../../../mocks';

let checkIfCarExistsByIdRepositorySpy: CheckIfCarExistsByIdRepositorySpy;
let createCarImageRepositorySpy: CreateCarImageRepositorySpy;
let storeFileProviderSpy: StoreFileProviderSpy;
let imagesPath: string;

let addImagesToCarUseCase: AddImagesToCarUseCase;

describe('AddImagesToCarUseCase', () => {
  beforeEach(() => {
    checkIfCarExistsByIdRepositorySpy = new CheckIfCarExistsByIdRepositorySpy();
    createCarImageRepositorySpy = new CreateCarImageRepositorySpy();
    storeFileProviderSpy = new StoreFileProviderSpy();
    imagesPath = makeUpdateUserAvatarUseCaseAvatarPathMock();

    addImagesToCarUseCase = new AddImagesToCarUseCase(
      checkIfCarExistsByIdRepositorySpy,
      createCarImageRepositorySpy,
      storeFileProviderSpy,
      imagesPath
    );
  });

  it('should call CheckIfCarExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfCarExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeAddImagesToCarUseCaseInputMock();

    await addImagesToCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.car_id,
    });
  });

  it('should throw if CheckIfCarExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeAddImagesToCarUseCaseInputMock();

    const promise = addImagesToCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw CarNotFoundWithProvidedIdError if CheckIfCarExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfCarExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeAddImagesToCarUseCaseInputMock();

    const promise = addImagesToCarUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      CarNotFoundWithProvidedIdError
    );
  });

  it('should call CreateCarImageRepository for every file with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      createCarImageRepositorySpy,
      'create'
    );

    const input = makeAddImagesToCarUseCaseInputMock();

    await addImagesToCarUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(input.files.length);

    input.files.forEach(file => {
      expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
        car_id: input.car_id,
        original_name: file.name,
        extension: file.extension,
        mime_type: file.type,
        size_in_bytes: file.size,
      });
    });
  });

  it('should throw if CreateCarImageRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createCarImageRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeAddImagesToCarUseCaseInputMock();

    const promise = addImagesToCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call StoreFileProvider for every file with correct values', async () => {
    const storeSpy = jest.spyOn(storeFileProviderSpy, 'store');

    const input = makeAddImagesToCarUseCaseInputMock();

    const createSpy = jest.spyOn(createCarImageRepositorySpy, 'create');

    const carImagesMock = input.files.map(() => makeCarImageMock());

    carImagesMock.forEach(carImageMock => {
      createSpy.mockResolvedValueOnce(carImageMock);
    });

    await addImagesToCarUseCase.execute(input);

    expect(storeSpy).toHaveBeenCalledTimes(input.files.length);

    input.files.forEach((file, index) => {
      expect(storeSpy).toHaveBeenCalledWith({
        file_name: carImagesMock[index].id,
        folder_path: imagesPath,
        content: file.content,
      });
    });
  });

  it('should throw if StoreFileProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(storeFileProviderSpy, 'store').mockRejectedValueOnce(errorMock);

    const input = makeAddImagesToCarUseCaseInputMock();

    const promise = addImagesToCarUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Car Images on success', async () => {
    const input = makeAddImagesToCarUseCaseInputMock();

    const createSpy = jest.spyOn(createCarImageRepositorySpy, 'create');

    const carImagesMock = input.files.map(() => makeCarImageMock());

    carImagesMock.forEach(carImageMock => {
      createSpy.mockResolvedValueOnce(carImageMock);
    });

    const output = await addImagesToCarUseCase.execute(input);

    expect(output).toEqual(carImagesMock);
  });
});
