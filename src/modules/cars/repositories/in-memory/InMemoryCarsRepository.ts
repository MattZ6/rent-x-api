import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IGetAllAvailableDTO } from '@modules/cars/dtos/IGetAllAvailableDTO';
import { IUpdateAvailabilityDTO } from '@modules/cars/dtos/IUpdateAvailabilityDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class InMemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    } as Car);

    this.cars.push(car);

    return car;
  }

  async update(data: Car): Promise<Car> {
    Object.assign(data, { updated_at: new Date() } as Car);

    this.cars = this.cars.map(car => (car.id === data.id ? data : car));

    return data;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find(
      car => car.license_plate.toUpperCase() === licensePlate.toUpperCase()
    );
  }

  async allAvailable(data: IGetAllAvailableDTO): Promise<Car[]> {
    const { name, brand, category_id } = data;

    let cars = this.cars.filter(car => car.is_available);

    if (name) {
      cars = cars.filter(car =>
        car.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (brand) {
      cars = cars.filter(car =>
        car.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (category_id) {
      cars = cars.filter(car => car.category_id === category_id);
    }

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailability({
    id,
    is_available,
  }: IUpdateAvailabilityDTO): Promise<void> {
    const index = this.cars.findIndex(x => x.id === id);

    this.cars[index].is_available = is_available;
  }
}
