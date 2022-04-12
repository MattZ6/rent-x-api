import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function conflict(error: ApplicationError): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 409,
    body: toErrorDTO(error),
  };
}
