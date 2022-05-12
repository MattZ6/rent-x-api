import { IValidation } from '@presentation/protocols';

export class ValidationComposite<I = unknown> implements IValidation<I> {
  constructor(private readonly validations: IValidation<I>[]) {}

  validate(input: I) {
    const error = this.validations
      .map(validation => validation.validate(input))
      .reduce((previous, current) => {
        if (!previous && current) {
          return current;
        }

        return previous;
      }, null);

    return error;
  }
}
