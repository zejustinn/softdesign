import User from './User.js';
import authService from './authService.js';

const authController = {
  authenticateUser: async (email, password) => {
    const user = new User({ email, password });
    user.validateRequiredContent();

    return await authService.authenticateUser(user);
  },
};

export default authController;
