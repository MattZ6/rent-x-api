export interface IHttpResponse<B = unknown> {
  statusCode: number;
  body?: B;
}

export interface IHttpRequest<
  B = unknown,
  P = unknown,
  Q = unknown,
  H = unknown
> {
  user_id?: string;
  body?: B;
  params?: P;
  query?: Q;
  headers?: H;
}
