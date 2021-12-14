import { container } from 'tsyringe';

import '@shared/container/providers';

import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { RentsRepository } from '@modules/rents/infra/typeorm/repositories/RentsRepository';
import { IRentsRepository } from '@modules/rents/repositories/IRentsRepository';
import { UserRefreshTokensRepository } from '@modules/users/infra/typeorm/repositories/UserRefreshTokensRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUserRefreshTokensRepository } from '@modules/users/repositories/IUserRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';

import { IDatabaseTransactionsProvider } from '@shared/infra/typeorm/repositories/IDatabaseTransactionsProvider';
import { DatabaseTransactionsProvider } from '@shared/infra/typeorm/repositories/implementations/DbTransactionsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserRefreshTokensRepository>(
  'UserRefreshTokensRepository',
  UserRefreshTokensRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository
);

container.registerSingleton<IRentsRepository>(
  'RentsRepository',
  RentsRepository
);

container.registerSingleton<IDatabaseTransactionsProvider>(
  'DatabaseTransactionsProvider',
  DatabaseTransactionsProvider
);
