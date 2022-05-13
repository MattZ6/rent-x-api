declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    /**
     * The current authenticated user
     */
    user?: {
      id: string;
      role: 'ADMIN' | 'DRIVER';
    };
  }
}
