import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function notFound(error: ApplicationError): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 404,
    body: toErrorDTO(error),
  };
}
