import { ValidationError } from '@presentation/errors';
import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO } from '../errorDTO';

type ValidationErrorData = {
  field?: string;
  type?: string;
  value?: string | number;
  message: string;
};

type ValidationErrorDTO = ErrorDTO & {
  validation: ValidationErrorData;
};

export function badRequest(
  error: ValidationError
): IHttpResponse<ValidationErrorDTO> {
  return {
    statusCode: 400,
    body: {
      code: 'validation',
      message: 'Validation error',
      validation: {
        field: error.field,
        type: error.type,
        value: error.value,
        message: error.message,
      },
    },
  };
}
