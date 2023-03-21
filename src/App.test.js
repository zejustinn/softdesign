import sinon from 'sinon';
import { assert } from 'chai';

import App from './App.js';
import utils from './components/utils/utils.js';
import booksAPI from './components/books/booksAPI.js';
import authAPI from './components/auth/authAPI.js';

describe('src/App.js', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking "checkRequiredEnvironmentVariables"', () => {
    it('Should call "checkRequiredEnvironmentVariables" from utils', () => {
      const fakeCheckRequiredEnvironmentVariables = sinon.fake();
      sinon.replace(
        utils,
        'checkRequiredEnvironmentVariables',
        fakeCheckRequiredEnvironmentVariables
      );
      const app = new App();

      app.checkRequiredEnvironmentVariables();

      assert.isTrue(fakeCheckRequiredEnvironmentVariables.calledOnce);
    });
  });

  describe('When involking "createExpressServer"', () => {
    it('Should set value of "express" as a function', () => {
      const app = new App();

      app.createExpressServer();

      assert.isFunction(
        app.express,
        'Not any function but an Express interface'
      );
    });
  });

  describe('When involking "setExpressMiddlewares"', () => {
    it('Should call "use" of "express" once per middlware', () => {
      const fakeUse = sinon.fake();
      const expressObject = {
        use: fakeUse,
      };
      const app = new App();
      app.express = expressObject;

      app.setExpressMiddlewares();

      assert.equal(
        fakeUse.callCount,
        2,
        'Expected 2 calls with: express.json(), helmet()'
      );
    });
  });

  describe('When involking "startApplicationServer"', () => {
    describe('Shold call "listen" of "express" with given "port"', () => {
      it('Then involke given callback', () => {
        const fakeListen = sinon.fake();
        const expressObject = {
          listen: fakeListen,
        };
        const app = new App();
        app.express = expressObject;
        const port = 3000;
        const fakeCallback = sinon.fake();

        app.startApplicationServer(port, fakeCallback);

        assert.isTrue(fakeListen.calledOnceWith(port));
        assert.isTrue(fakeCallback.calledOnce);
      });
    });
  });

  describe('When involking "setRoutes"', () => {
    it('Should call "use" of "express" once per resource', () => {
      const fakeUse = sinon.fake();
      const expressObject = {
        use: fakeUse,
      };
      const app = new App();
      app.express = expressObject;

      app.setRoutes();

      assert.isTrue(fakeUse.calledOnceWithExactly('/books', booksAPI));
      assert.isTrue(fakeUse.calledOnceWithExactly('/auth', authAPI));
    });
  });
});
