import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO } from '../errorDTO';

export function internalServerError(_: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 500,
    body: {
      code: 'internal',
      message: 'Internal server error',
    },
  };
}
