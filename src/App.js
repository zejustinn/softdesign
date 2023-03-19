import express from 'express';
import helmet from 'helmet';

import Utils from './components/utils/Utils.js';

class App {
  checkRequiredEnvironmentVariables() {
    Utils.checkRequiredEnvironmentVariables();
  }

  createExpressServer = () => {
    this.express = express();
  };

  setExpressMiddlewares = () => {
    this.express.use(express.json());
    this.express.use(helmet());
  };

  startApplicationServer = (port, callback) => {
    this.express.listen(port, callback());
  };
}

export default App;
