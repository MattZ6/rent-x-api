declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    /**
     * Id of the authenticated user.
     * Get by access token.
     */
    user_id: string;
  }
}
