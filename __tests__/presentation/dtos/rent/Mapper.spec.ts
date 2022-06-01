import { CarMapper, RentMapper } from '@presentation/dtos';

import { makeRentMock } from '../../../domain';

describe('RentMapper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return schedule item DTO', () => {
    const rentMock = makeRentMock();

    const output = RentMapper.toScheduleItemDTO(rentMock);

    expect(output).toEqual({
      start_date: rentMock.start_date,
      expected_return_date: rentMock.expected_return_date,
    });
  });

  it('should return a list of schedule item DTO', () => {
    const rentsMock = [
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
    ];

    const output = RentMapper.toScheduleDTO(rentsMock);

    expect(output).toEqual(
      rentsMock.map(({ start_date, expected_return_date }) => ({
        start_date,
        expected_return_date,
      }))
    );
  });

  it('should return rent list item DTO', () => {
    const carMock = null;

    jest.spyOn(CarMapper, 'toListItemDTO').mockReturnValueOnce(carMock);

    const rentMock = makeRentMock();

    const output = RentMapper.toRentListItemDTO(rentMock);

    expect(output).toEqual({
      id: rentMock.id,
      start_date: rentMock.start_date,
      expected_return_date: rentMock.expected_return_date,
      daily_rate: rentMock.daily_rate,
      car: carMock,
    });
  });

  it('should return a list of rent list item DTO', () => {
    const carMock = null;

    jest.spyOn(CarMapper, 'toListItemDTO').mockReturnValue(carMock);

    const rentsMock = [
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
      makeRentMock(),
    ];

    const output = RentMapper.toRentListItemsDTO(rentsMock);

    expect(output).toEqual(
      rentsMock.map(rent => ({
        id: rent.id,
        start_date: rent.start_date,
        expected_return_date: rent.expected_return_date,
        daily_rate: rent.daily_rate,
        car: carMock,
      }))
    );
  });
});
