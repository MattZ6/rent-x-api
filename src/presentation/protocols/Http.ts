export interface IHttpRespose<B = any> {
  statusCode: number;
  body?: B;
}

export interface IHttpRequest<B = any, P = any, Q = any> {
  user_id?: string;
  body?: B;
  params?: P;
  query?: Q;
}
