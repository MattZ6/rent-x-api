import csvParse from 'csv-parse';
import { createReadStream } from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

type Request = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

type CategoryToCreate = {
  name: string;
  description: string;
};

export class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  private loadCategories({ path }: Request): Promise<CategoryToCreate[]> {
    return new Promise<CategoryToCreate[]>((resolve, reject) => {
      const stream = createReadStream(path);
      const parseFile = csvParse();

      stream.pipe(parseFile);

      const categories: CategoryToCreate[] = [];

      parseFile
        .on('data', async chunk => {
          const [name, description] = chunk as string[];

          categories.push({
            name: name.trim(),
            description: description.trim(),
          });
        })
        .on('error', error => reject(error))
        .once('end', () => resolve(categories));
    });
  }

  async execute(file: Request): Promise<void> {
    const categoriesToCreate = await this.loadCategories(file);

    categoriesToCreate.forEach(category => {
      const { name, description } = category;

      const exists = this.categoriesRepository.findByName(name);

      if (!exists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
