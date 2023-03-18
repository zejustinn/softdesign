import express from 'express';
import helmet from 'helmet';

import checkRequiredEnvironmentVariables from './utils/checkRequiredEnvironmentVariables.js';

checkRequiredEnvironmentVariables();

const app = express();

app.use(express.json());
app.use(helmet());
app.get('/test', (req, res) => {
  res.status(200).json({ name: 'jose' });
});

export default app;
