import { AppError } from '../../../../errors/AppError';
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepository: InMemoryCategoriesRepository;

let createCategoryUseCase: CreateCategoryUseCase;

describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();

    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const name = 'category';
    const description = 'category description';

    await createCategoryUseCase.execute({ name, description });

    const category = await categoriesRepository.findByName(name);

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with name of another', async () => {
    const name = 'category';
    const description = 'category description';

    await categoriesRepository.create({ name, description });

    const promise = createCategoryUseCase.execute({ name, description });

    expect(promise).rejects.toBeInstanceOf(AppError);
  });
});
