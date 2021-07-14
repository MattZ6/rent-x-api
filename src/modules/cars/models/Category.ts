import { v4 as generateUuid } from 'uuid';

type CreateCategory = {
  name: string;
  description: string;
};

export class Category {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  constructor({ name, description }: CreateCategory) {
    if (!this.id) {
      this.id = generateUuid();
      this.created_at = new Date();
    }

    Object.assign<Category, Omit<Category, 'id' | 'created_at'>>(this, {
      name,
      description,
    });
  }
}
