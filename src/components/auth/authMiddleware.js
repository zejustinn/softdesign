import authController from './authController.js';

const signJwtToken = function (req, res, next) {
  try {
    const token = req.get('Authorization');

    if (!token) throw new Error('400 bad request');

    authController.verifyJwtToken(token.replace('Bearer ', ''));

    next();
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
};

export { signJwtToken };
