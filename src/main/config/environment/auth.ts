export const authConfig = {
  AUTH_SECRET: process.env.APP_JWT_SECRET,
  AUTH_EXPIRES_IN_IN_SECONDS: 15 * 60, // 👈 15 min

  HASH_SALT: 12,
};
