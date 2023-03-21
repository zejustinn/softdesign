import User from './User.js';
import authService from './authService.js';
import ServerResponse from '../utils/ServerResponse.js';

const authController = {
  authenticateUser: async (email, password) => {
    const user = new User({ email, password });
    user.validateRequiredContent();

    return new ServerResponse(200, await authService.authenticateUser(user));
  },

  verifyJwtToken: (token) => {
    return authService.verifyJwtToken(token);
  },
};

export default authController;
