import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authDAL from './authDAL.js';
import User from './User.js';

const authService = {
  authenticateUser: async (user) => {
    const userFound = await authDAL.getUserByEmail(user.email);

    if (!userFound) throw new Error('User not found');

    if (!(await authService.checkPassword(user.password, userFound.password)))
      throw new Error('Authentication failed');

    const authenticatedUser = new User(userFound);
    const token = await authService.createJwtToken(authenticatedUser);

    return {
      user: authenticatedUser,
      token,
    };
  },

  checkPassword: async (textPassword, hasedPassword) => {
    return await bcrypt.compare(textPassword, hasedPassword);
  },

  createJwtToken: async (user) => {
    return await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
      process.env.JWT_PRIVATE_KEY
    );
  },

  verifyJwtToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch {
      throw new Error('401 Unauthorized');
    }
  },
};

export default authService;
