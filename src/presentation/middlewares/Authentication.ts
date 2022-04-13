import { IVerifyCriptographyProvider } from '@application/protocols/providers/cryptography/cryptography';

import {
  AccessTokenNotProvidedError,
  InvalidTokenError,
  PermissionDeniedError,
  TokenExpiredError,
} from '@presentation/errors';
import { forbidden, ok, unauthorized } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/protocols';

class ClientAuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly verifyCriptographyProvider: IVerifyCriptographyProvider
  ) {}

  async handle(
    request: ClientAuthenticationMiddleware.Request
  ): Promise<ClientAuthenticationMiddleware.Response> {
    try {
      const accessToken = request.headers['x-access-token'];

      if (!accessToken) {
        throw new AccessTokenNotProvidedError();
      }

      const { subject, payload } =
        await this.verifyCriptographyProvider.verify<ClientAuthenticationMiddleware.TokenPayload>(
          {
            value: accessToken,
          }
        );

      if (payload.role !== 'client') {
        throw new PermissionDeniedError();
      }

      return ok<ClientAuthenticationMiddleware.ResponseBody>({
        client_id: subject,
      });
    } catch (error) {
      if (error instanceof AccessTokenNotProvidedError) {
        return unauthorized(error);
      }

      if (error instanceof InvalidTokenError) {
        return unauthorized(error);
      }

      if (error instanceof TokenExpiredError) {
        return unauthorized(error);
      }

      if (error instanceof PermissionDeniedError) {
        return forbidden(error);
      }

      throw error;
    }
  }
}

namespace ClientAuthenticationMiddleware {
  type RequestHeaders = {
    ['x-access-token']: string;
  };

  export type Request = IHttpRequest<unknown, unknown, unknown, RequestHeaders>;

  export type Response = IHttpResponse;

  export type ResponseBody = {
    user_id: string;
  };
}

export { ClientAuthenticationMiddleware };
