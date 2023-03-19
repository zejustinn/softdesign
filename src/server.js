import console from 'console';

import App from './App.js';

const port = 3000;

const app = new App();
app.checkRequiredEnvironmentVariables();
app.createExpressServer();
app.setExpressMiddlewares();
app.express.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});
