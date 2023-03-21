import UsersModel from './mongo/UserModel.js';
import utils from '../utils/utils.js';

const authDAL = {
  getUserByEmail: async (email) => {
    const mongoConnection = await utils.startMongoConnection();

    const result = await authDAL.findUserByEmail(email);

    await utils.endMongoConnection(mongoConnection);

    return result;
  },

  findUserByEmail: async (email) => {
    return await UsersModel.findOne({ email });
  },

  getCachedUserByEmail: async (email) => {
    const redisConnection = await utils.startRedisConnection();

    const result = await redisConnection.get(email);

    await utils.endRedisConnection(redisConnection);

    return result;
  },

  setCachedUserByEmail: async (user) => {
    const redisConnection = await utils.startRedisConnection();

    const result = await redisConnection.set(user.email, JSON.stringify(user));

    await utils.endRedisConnection(redisConnection);

    return result;
  },

  getCachedUserTokenById: async (id) => {
    const redisConnection = await utils.startRedisConnection();

    const result = await redisConnection.get(id);

    await utils.endRedisConnection(redisConnection);

    return result;
  },

  setCachedUserTokenById: async (id, token) => {
    const redisConnection = await utils.startRedisConnection();

    const result = await redisConnection.set(id, token, {
      EX: process.env.JWT_EXPIRATION_TIME_IN_SECCONDS,
    });

    await utils.endRedisConnection(redisConnection);

    return result;
  },
};

export default authDAL;
