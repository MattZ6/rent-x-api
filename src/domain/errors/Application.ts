export class ApplicationError extends Error {
  public code: string;

  constructor(message: string, code = 'error') {
    super(message);

    super.name = this.constructor.name;
    this.code = code;
  }
}
