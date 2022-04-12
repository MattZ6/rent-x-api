import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function unauthorized(error: ApplicationError): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 401,
    body: toErrorDTO(error),
  };
}
