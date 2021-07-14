import { v4 as generateUuid } from 'uuid';

type CreateSpecification = {
  name: string;
  description: string;
};

export class Specification {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  constructor({ name, description }: CreateSpecification) {
    if (!this.id) {
      this.id = generateUuid();
      this.created_at = new Date();
    }

    Object.assign<Specification, Omit<Specification, 'id' | 'created_at'>>(
      this,
      {
        name,
        description,
      }
    );
  }
}
