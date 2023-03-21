import { assert } from 'chai';
import mongoose from 'mongoose';
import redis from 'redis';
import sinon from 'sinon';
import ServerError from './ServerError.js';
import ServerResponse from './ServerResponse.js';
import utils from './utils.js';

describe('src/utils/utils.js', () => {
  afterEach(() => {
    sinon.restore();
  });

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

  describe('When involking "generateServerResponseFromError"', () => {
    describe('Should returns result of "handleServerError"', () => {
      it('If given error is instance of "ServerError"', () => {
        const serverError = new ServerError('Test error');
        const handleServerErrorResult = 'Any result';
        const fakeHandleServerError = sinon.fake.returns(
          handleServerErrorResult
        );
        sinon.replace(utils, 'handleServerError', fakeHandleServerError);

        const result = utils.generateServerResponseFromError(serverError);

        assert.isTrue(fakeHandleServerError.calledOnce);
        assert.equal(result, handleServerErrorResult);
      });
    });
  });

  describe('When involking "handleServerError"', () => {
    it('Should return a instance of "ServerResponse"', () => {
      const serverError = new ServerError(200, 'Any friendly feedback');

      const result = utils.handleServerError(serverError);

      assert.instanceOf(result, ServerResponse);
    });
  });

  describe('When involking "startRedisConnection"', () => {
    it('Should get "redisConnection" of "createClient" to call "connect" and then be returned', async () => {
      const fakeConnect = sinon.fake();
      const fakeRedisConnection = {
        connect: fakeConnect,
      };
      const fakeCreateClient = sinon.fake.resolves(fakeRedisConnection);
      sinon.replace(redis, 'createClient', fakeCreateClient);

      const result = await utils.startRedisConnection();

      assert.isTrue(
        fakeConnect.calledOnce,
        '"redisConnection" should call "connect"'
      );
      assert.deepEqual(
        result,
        fakeRedisConnection,
        '"redisConnection" returned by "createClient" should be returned'
      );
    });
  });

  describe('When involking "endRedisConnection"', () => {
    it('Should call "disconnect" from given "redisConnection"', async () => {
      const fakeDisconnect = sinon.fake();
      const redisConnection = {
        disconnect: fakeDisconnect,
      };

      await utils.endRedisConnection(redisConnection);

      assert.isTrue(fakeDisconnect.calledOnce);
    });
  });
});
