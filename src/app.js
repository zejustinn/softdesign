import express from 'express';

const app = express();

app.use(express.json());
app.get('/test', (_, res) => {
  res.status(200).json({ name: 'jose' });
});

export default app;
