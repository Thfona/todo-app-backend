export class EnvironmentUtil {
  public static isProduction(): boolean {
    if (process.env.NODE_ENV) {
      return process.env.NODE_ENV === 'production';
    }

    throw new Error('Node Environment is undefined.');
  }

  public static databaseHost(): string {
    if (process.env.DB_HOST) {
      return process.env.DB_HOST;
    }

    throw new Error('Database Host is undefined.');
  }

  public static serverPort(): string {
    if (process.env.PORT) {
      return process.env.PORT;
    }

    throw new Error('Server Port is undefined.');
  }

  public static accessTokenSecret(): string {
    if (process.env.ACCESS_TOKEN_SECRET) {
      return process.env.ACCESS_TOKEN_SECRET;
    }

    throw new Error('Access token secret is undefined.');
  }

  public static refreshTokenSecret(): string {
    if (process.env.REFRESH_TOKEN_SECRET) {
      return process.env.REFRESH_TOKEN_SECRET;
    }

    throw new Error('Refresh token secret is undefined.');
  }

  public static validationTokenSecret(): string {
    if (process.env.VALIDATION_TOKEN_SECRET) {
      return process.env.VALIDATION_TOKEN_SECRET;
    }

    throw new Error('Validation token secret is undefined.');
  }
}
