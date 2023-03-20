import mongoose from 'mongoose';

const utils = {
  /**
   * Method created to test predefined environment variables before trying to
   * start the server
   * @param {Array<string>} requiredEnviromentVariables value should never be
   * given by the caller. He should declare new environment variables by adding
   * to the default value. Created this way to facilitate tests
   */
  checkRequiredEnvironmentVariables: (
    requiredEnviromentVariables = [
      'NODE_ENV',
      'EXPRESS_SERVER_PORT',
      'MONGO_USERNAME',
      'MONGO_PASSWORD',
      'MONGO_DATABASE',
    ]
  ) => {
    requiredEnviromentVariables.forEach((requiredEnviromentVariable) => {
      // Object injection suppressed because it's controlled data
      // eslint-disable-next-line security/detect-object-injection
      if (!process.env[requiredEnviromentVariable])
        throw new Error(
          'Required variables must not be neither null or undefined. be sure to define them'
        );
    });
  },

  startMongoConnection: async () => {
    return await mongoose.connect(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`
    );
  },

  endMongoConnection: async (mongoConnection) => {
    await mongoConnection.disconnect();
  },

  formatJsonSchemaValidationErrors: (errors) => {
    let result = 'Error with given data: ';

    errors.forEach(({ stack }, index) => {
      index !== errors.length - 1
        ? (result += stack + '; ')
        : (result += stack + '.');
    });

    return result.replaceAll('instance.', '');
  },
};

export default utils;
