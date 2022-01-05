export const authConfig = {
  /** Authentication */

  ACCESS_TOKEN_SECRET: process.env.AUTH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN_SECONDS: 15 * 60, // 👈 15 min

  /** Refresh token */

  REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS: 5 * 24 * 60 * 60 * 1000, // 👈 5 days

  /** Hash provider */

  HASH_SALT: 12,
};
