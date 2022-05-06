import { UserRole } from '@domain/entities/User';

import { IVerifyCriptographyProvider } from '@application/protocols/providers/cryptography';

import {
  AccessTokenNotProvidedError,
  InvalidTokenError,
  TokenExpiredError,
} from '@presentation/errors';
import { ok, unauthorized } from '@presentation/helpers/http';
import {
  IMiddleware,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class AuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly verifyCriptographyProvider: IVerifyCriptographyProvider
  ) {}

  async handle(
    request: AuthenticationMiddleware.Request
  ): Promise<AuthenticationMiddleware.Response> {
    try {
      const accessToken = request.headers['x-access-token'];

      if (!accessToken) {
        throw new AccessTokenNotProvidedError();
      }

      const { subject, payload } =
        await this.verifyCriptographyProvider.verify<AuthenticationMiddleware.TokenPayload>(
          {
            value: accessToken,
          }
        );

      return ok<AuthenticationMiddleware.ResponseBody>({
        id: subject,
        role: payload.role,
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
    ['x-access-token']: string;
  };

  export type TokenPayload = {
    role: UserRole;
  };

  export type Request = IHttpRequest<unknown, unknown, unknown, RequestHeaders>;

  export type Response = IHttpResponse;

  export type ResponseBody = {
    id: string;
    role: UserRole;
  };
}

export { AuthenticationMiddleware };
