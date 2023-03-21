import { Router } from 'express';
import utils from '../utils/utils.js';
import authController from './authController.js';

const authAPI = Router();

authAPI.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const serverResponse = await authController.authenticateUser(
      email,
      password
    );

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

export default authAPI;
