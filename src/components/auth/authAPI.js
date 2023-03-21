import { Router } from 'express';
import authController from './authController.js';

const authAPI = Router();

authAPI.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authController.authenticateUser(email, password);

    res.contentType('application/json').status(200).send({ data: user });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

export default authAPI;
