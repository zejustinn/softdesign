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
};

export default authDAL;
