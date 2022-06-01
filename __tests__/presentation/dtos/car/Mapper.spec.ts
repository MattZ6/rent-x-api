import {
  CarBrandMapper,
  CarCategoryMapper,
  CarMapper,
} from '@presentation/dtos';

import {
  makeCarBrandMock,
  makeCarCategoryMock,
  makeCarMock,
} from '../../../domain';

describe('CarMapper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return car list item DTO', () => {
    const carBrandMock = makeCarBrandMock();

    jest.spyOn(CarBrandMapper, 'toBrandDTO').mockReturnValueOnce(carBrandMock);

    const carMock = makeCarMock();

    const output = CarMapper.toListItemDTO(carMock);

    expect(output).toEqual({
      id: carMock.id,
      name: carMock.name,
      description: carMock.description,
      daily_rate: carMock.daily_rate,
      type_of_fuel: carMock.type_of_fuel,
      brand: carBrandMock,
    });
  });

  it('should return null if no data provided', () => {
    const output = CarMapper.toListItemDTO(undefined);

    expect(output).toBeNull();
  });

  it('should return a list of car list item DTO', () => {
    const carBrandMock = makeCarBrandMock();

    jest.spyOn(CarBrandMapper, 'toBrandDTO').mockReturnValue(carBrandMock);

    const carMocks = [
      makeCarMock(),
      makeCarMock(),
      makeCarMock(),
      makeCarMock(),
    ];

    const output = CarMapper.toListItemsDTO(carMocks);

    expect(output).toEqual(
      carMocks.map(car => ({
        id: car.id,
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        type_of_fuel: car.type_of_fuel,
        brand: carBrandMock,
      }))
    );
  });

  it('should return car details DTO', () => {
    const carBrandMock = makeCarBrandMock();
    jest.spyOn(CarBrandMapper, 'toBrandDTO').mockReturnValueOnce(carBrandMock);

    const carCategoryMock = makeCarCategoryMock();
    jest
      .spyOn(CarCategoryMapper, 'toCategoryDTO')
      .mockReturnValueOnce(carCategoryMock);

    const carMock = makeCarMock();

    const output = CarMapper.toDetailsDTO(carMock);

    expect(output).toEqual({
      id: carMock.id,
      name: carMock.name,
      description: carMock.description,
      daily_rate: carMock.daily_rate,
      type_of_fuel: carMock.type_of_fuel,
      transmission_type: carMock.transmission_type,
      max_speed: carMock.max_speed,
      zero_to_one_hundred_in_millisseconds:
        carMock.zero_to_one_hundred_in_millisseconds,
      number_of_seats: carMock.number_of_seats,
      horse_power: carMock.horse_power,
      brand: carBrandMock,
      category: carCategoryMock,
    });
  });
});
