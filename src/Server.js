import console from 'console';

export default class Server {
  constructor(app, port) {
    this.app = app;
    this.port = port;
  }

  run = () => {
    this.configureServer();
    this.startServer();
  };

  configureServer = () => {
    this.app.checkRequiredEnvironmentVariables();
    this.app.createExpressServer();
    this.app.setExpressMiddlewares();
    this.app.setRoutes();
  };

  startServer = () => {
    this.app.startApplicationServer(this.port, this.showServerFeedback);
  };

  showServerFeedback = () => {
    console.log(`Server is running on port ${this.port}`);
  };
}
