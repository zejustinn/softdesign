import ServerError from '../utils/ServerError.js';
import utils from '../utils/utils.js';
import authController from './authController.js';

const signJwtToken = function (req, res, next) {
  try {
    const token = req.get('Authorization');

    if (!token)
      throw new ServerError(
        400,
        'An authentication token is required to access this endpoint.'
      );

    authController.verifyJwtToken(token.replace('Bearer ', ''));

    next();
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
};

export { signJwtToken };
