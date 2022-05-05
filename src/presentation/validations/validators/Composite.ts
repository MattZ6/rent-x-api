import { IValidation } from '@presentation/protocols';

export class ValidationComposite<I = unknown> implements IValidation<I> {
  constructor(private readonly validations: IValidation<I>[]) {}

  validate(input: I) {
    const validation = this.validations.find(
      validation => !!validation.validate(input)
    );

    return validation?.validate(input) ?? null;
  }
}
