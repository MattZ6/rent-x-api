import { ApplicationError } from '@domain/errors';

export type ErrorDTO = {
  code: string;
  message: string;
};

export function toErrorDTO(error: ApplicationError | Error): ErrorDTO {
  let code = 'internal';

  if (error instanceof ApplicationError) {
    code = error.code;
  }

  return {
    code,
    message: error.message,
  };
}
