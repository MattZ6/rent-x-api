import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function forbidden(error: ApplicationError): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 403,
    body: toErrorDTO(error),
  };
}
