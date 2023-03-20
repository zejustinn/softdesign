import { assert } from 'chai';
import utils from './utils.js';

describe('src/utils/checkRequiredEnvironmentVariables.js', () => {
  describe('When involking checkRequiredEnvironmentVariables', () => {
    describe('Should test given envionment variables', () => {
      it('Without any error, if all environment variables are setted', () => {
        process.env.TESTS_ENVIRONMENT_VARIABLE = 'Any value';

        utils.checkRequiredEnvironmentVariables(['TESTS_ENVIRONMENT_VARIABLE']);
      });

      it('With error, if any environment variables are not setted', () => {
        delete process.env.TESTS_ENVIRONMENT_VARIABLE;

        assert.throws(() => {
          utils.checkRequiredEnvironmentVariables([
            'TESTS_ENVIRONMENT_VARIABLE',
          ]);
        }, Error);
      });
    });
  });
});
