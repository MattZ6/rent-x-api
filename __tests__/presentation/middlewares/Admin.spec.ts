import { PermissionDeniedError } from '@presentation/errors';
import { noContent, forbidden } from '@presentation/helpers/http';
import { AdminMiddleware } from '@presentation/middlewares/Admin';

import { makeAdminMiddlewareRequestMock } from '../mocks';

let adminMiddleware: AdminMiddleware;

describe('AdminMiddleware', () => {
  beforeEach(() => {
    adminMiddleware = new AdminMiddleware();
  });

  it('should return forbidden (401) if user is null', async () => {
    const request = makeAdminMiddlewareRequestMock();

    request.user = null;

    const response = await adminMiddleware.handle(request);

    expect(response).toEqual(forbidden(new PermissionDeniedError()));
  });

  it('should return forbidden (401) if user role is not DRIVER', async () => {
    const request = makeAdminMiddlewareRequestMock();

    request.user.role = 'DRIVER';

    const response = await adminMiddleware.handle(request);

    expect(response).toEqual(forbidden(new PermissionDeniedError()));
  });

  it('should return no content (204) on success', async () => {
    const request = makeAdminMiddlewareRequestMock();

    const response = await adminMiddleware.handle(request);

    expect(response).toEqual(noContent());
  });
});
