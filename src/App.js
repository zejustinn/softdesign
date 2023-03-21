import express from 'express';
import helmet from 'helmet';
import authAPI from './components/auth/authAPI.js';
import { signJwtToken } from './components/auth/authMiddleware.js';
import booksAPI from './components/books/booksAPI.js';

import utils from './components/utils/utils.js';

class App {
  checkRequiredEnvironmentVariables() {
    utils.checkRequiredEnvironmentVariables();
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

  setRoutes = () => {
    this.express.use('/auth', authAPI);
    this.express.use('/books', signJwtToken, booksAPI);
  };
}

export default App;
