export const mailConfig = {
  /** Default email from */

  TEAM_EMAIL_NAME: 'RentX Team',
  TEAM_EMAIL_ADDRESS: 'noreply@rentx.com.br',

  /** Pasword reset */

  RESET_PASSWORD_LINK_URL: process.env.RESET_PASSWORD_URL,
  RESET_PASSWORD_LINK_QUERY_PARAM_NAME:
    process.env.RESET_PASSWORD_TOKEN_PARAM_NAME,
  RESET_PASSWORD_EXPIRES_IN_MILLISSECONDS: 3 * 60 * 60 * 1000, // 👈 3 hours
};
