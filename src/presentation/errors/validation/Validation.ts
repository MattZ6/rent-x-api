export class ValidationError extends Error {
  public field: string;
  public type: string;
  public value?: string | number;

  constructor(
    field: string,
    type: string,
    message: string,
    value: string | number = undefined
  ) {
    super(message);

    super.name = this.constructor.name;
    this.field = field;
    this.type = type;
    this.value = value;
  }
}
