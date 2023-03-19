import { assert } from 'chai';
import sinon from 'sinon';
import Server from './Server.js';
import console from 'console';

describe('src/Server.js', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('When involking "run"', () => {
    it('Should call "configureServer" and "startServer"', () => {
      const fakeConfigureServer = sinon.fake();
      const fakeStartServer = sinon.fake();
      const server = new Server('app', 'port');
      sinon.replace(server, 'configureServer', fakeConfigureServer);
      sinon.replace(server, 'startServer', fakeStartServer);

      server.run();

      assert.isTrue(fakeConfigureServer.calledOnce);
      assert.isTrue(fakeStartServer.calledOnce);
    });
  });

  describe('When involking "configureServer"', () => {
    it('Should call app\'s "checkRequiredEnvironmentVariables", "createExpressServer" and "setExpressMiddlewares"', () => {
      const fakeCheckRequiredEnvironmentVariables = sinon.fake();
      const fakeCreateExpressServer = sinon.fake();
      const fakeSetExpressMiddlewares = sinon.fake();
      const app = {
        checkRequiredEnvironmentVariables:
          fakeCheckRequiredEnvironmentVariables,
        createExpressServer: fakeCreateExpressServer,
        setExpressMiddlewares: fakeSetExpressMiddlewares,
      };
      const server = new Server(app, 'port');

      server.configureServer();

      assert.isTrue(fakeCheckRequiredEnvironmentVariables.calledOnce);
      assert.isTrue(fakeCreateExpressServer.calledOnce);
      assert.isTrue(fakeSetExpressMiddlewares.calledOnce);
    });
  });

  describe('When involking "startServer"', () => {
    it('Should call app\'s "startApplicationServer" with given "port" and "showServerFeedback"', () => {
      const fakeStartApplicationServer = sinon.fake();
      const fakeShowServerFeedback = sinon.fake();
      const app = {
        startApplicationServer: fakeStartApplicationServer,
        showServerFeedback: fakeShowServerFeedback,
      };
      const port = 3000;
      const server = new Server(app, port);

      server.startServer();

      assert.isTrue(
        fakeStartApplicationServer.calledOnceWith(
          port,
          fakeStartApplicationServer.callback
        )
      );
    });

    describe('When involking "showServerFeedback"', () => {
      it('Should log on console useful server data', () => {
        const fakeLog = sinon.fake();
        sinon.replace(console, 'log', fakeLog);
        const server = new Server('app', 'port');

        server.showServerFeedback();

        assert.isTrue(fakeLog.calledOnce);
      });
    });
  });
});
