import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';
import { IController } from '@presentation/protocols';

import { makeListAllCarCategoriesUseCase } from '@main/factories/usecases/car/category/ListAll';

export function makeListAllCarCategoriesController(): IController {
  const listAllCarCategoriesUseCase = makeListAllCarCategoriesUseCase();

  return new ListAllCarCategoriesController(
    'name',
    'ASC',
    10,
    1,
    listAllCarCategoriesUseCase
  );
}
