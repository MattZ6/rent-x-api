import { IVerifyCriptographyProvider } from '@application/protocols/providers/cryptography/cryptography';

import {
  AccessTokenNotProvidedError,
  InvalidTokenError,
  TokenExpiredError,
} from '@presentation/errors';
import { ok, unauthorized } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/protocols';

class AuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly verifyCriptographyProvider: IVerifyCriptographyProvider
  ) {}

  async handle(
    request: AuthenticationMiddleware.Request
  ): Promise<AuthenticationMiddleware.Response> {
    try {
      const { authorization } = request.headers;

      if (!authorization) {
        throw new AccessTokenNotProvidedError();
      }

      const accessToken = String(authorization).trim().replace('Bearer ', '');

      if (!accessToken) {
        throw new AccessTokenNotProvidedError();
      }

      const { subject } = await this.verifyCriptographyProvider.verify({
        value: accessToken,
      });

      return ok<AuthenticationMiddleware.ResponseBody>({
        user_id: subject,
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

      throw error;
    }
  }
}

namespace AuthenticationMiddleware {
  type RequestHeaders = {
    authorization: string;
  };

  export type Request = IHttpRequest<unknown, unknown, unknown, RequestHeaders>;

  export type Response = IHttpResponse;

  export type ResponseBody = {
    user_id: string;
  };
}

export { AuthenticationMiddleware };
