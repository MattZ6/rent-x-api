import { ListCarCategoriesController } from '@presentation/controllers/car/category/ListCarCategories';
import { IController } from '@presentation/protocols';

import { makeListAllCarCategoriesUseCase } from '@main/factories/usecases/car/category/ListAllCarCategoriesUseCaseFactory';

export function makeListCarCategoriesController(): IController {
  const listAllCarCategoriesUseCase = makeListAllCarCategoriesUseCase();

  return new ListCarCategoriesController(
    'name',
    'ASC',
    10,
    1,
    listAllCarCategoriesUseCase
  );
}
