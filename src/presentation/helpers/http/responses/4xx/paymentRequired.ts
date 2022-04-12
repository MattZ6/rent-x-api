import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function paymentRequired(
  error: ApplicationError
): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 402,
    body: toErrorDTO(error),
  };
}
