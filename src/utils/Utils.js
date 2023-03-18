export default class Utils {
  /**
   * Method created to test predefined environment variables before trying to
   * start the server
   * @param {Array<string>} requiredEnviromentVariables value should never be
   * given by the caller. He should declare new environment variables by adding
   * to the default value. Created this way to facilitate tests
   */
  static checkRequiredEnvironmentVariables(
    requiredEnviromentVariables = ['NODE_ENV']
  ) {
    requiredEnviromentVariables.forEach((requiredEnviromentVariable) => {
      // Object injection suppressed because it's controlled data
      // eslint-disable-next-line security/detect-object-injection
      if (!process.env[requiredEnviromentVariable])
        throw new Error(
          'Required variables must not be neither null or undefined. be sure to define them'
        );
    });
  }
}
