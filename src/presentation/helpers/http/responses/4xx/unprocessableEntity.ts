import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function unprocessableEntity(
  error: ApplicationError
): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 422,
    body: toErrorDTO(error),
  };
}
