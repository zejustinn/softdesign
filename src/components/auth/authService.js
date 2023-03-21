import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ServerError from '../utils/ServerError.js';

import authDAL from './authDAL.js';
import User from './User.js';

const authService = {
  authenticateUser: async (user) => {
    const authenticatedUser = await authService.getUser(user);
    const token = await authService.getUserToken(authenticatedUser);

    return {
      user: authenticatedUser.getPublicData(),
      token,
    };
  },

  getUser: async (user) => {
    let userFound = null;

    const cachedUser = await authDAL.getCachedUserByEmail(user.email);
    if (cachedUser) {
      userFound = JSON.parse(cachedUser);
    } else {
      userFound = await authDAL.getUserByEmail(user.email);
    }

    if (!userFound)
      throw new ServerError(200, "Email doesn't match with any user.");

    if (!(await authService.checkPassword(user.password, userFound.password)))
      throw new ServerError(200, 'Authentication failed.');

    const authenticatedUser = new User(userFound);
    await authDAL.setCachedUserByEmail(authenticatedUser);

    return authenticatedUser;
  },

  checkPassword: async (textPassword, hasedPassword) => {
    return await bcrypt.compare(textPassword, hasedPassword);
  },

  getUserToken: async (user) => {
    let token = null;

    const cachedToken = await authDAL.getCachedUserTokenById(user.id);
    if (cachedToken) {
      token = cachedToken;
    } else {
      token = await authService.createJwtToken(user);
    }

    await authDAL.setCachedUserTokenById(user.id, token);

    return token;
  },

  createJwtToken: async (user) => {
    return await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: Number(process.env.JWT_EXPIRATION_TIME_IN_SECCONDS),
      }
    );
  },

  verifyJwtToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch {
      throw new ServerError(
        401,
        'Invalid token. Make sure the token stays valid.'
      );
    }
  },
};

export default authService;
