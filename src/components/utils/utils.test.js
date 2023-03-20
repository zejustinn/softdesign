import { assert } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import utils from './utils.js';

describe('src/utils/utils.js', () => {
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

  describe('When involking "startMongoConnection"', () => {
    it('Should call "connect" from "mongoose"', async () => {
      const fakeConnect = sinon.fake();
      sinon.replace(mongoose, 'connect', fakeConnect);

      await utils.startMongoConnection();

      assert.isTrue(fakeConnect.calledOnce);
    });
  });

  describe('When involking "endMongoConnection"', () => {
    it('Should call "disconnect" from given "mongoConnection"', async () => {
      const fakeDisconnect = sinon.fake();
      const mongoConnection = {
        disconnect: fakeDisconnect,
      };

      await utils.endMongoConnection(mongoConnection);

      assert.isTrue(fakeDisconnect.calledOnce);
    });
  });

  describe('When involking "formatJsonSchemaValidationErrors"', () => {
    it('Should concat all "stack" property replacing the word "instance." with "Error with given data: "', () => {
      const errors = [
        { stack: 'erro 1 some textinstance.' },
        { stack: 'instance.erro 2 some text' },
        { stack: 'erro 2 instance.some text' },
      ];

      const result = utils.formatJsonSchemaValidationErrors(errors);

      assert.equal(
        result,
        'Error with given data: erro 1 some text; erro 2 some text; erro 2 some text.'
      );
    });
  });
});
