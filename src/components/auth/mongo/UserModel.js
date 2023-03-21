import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  profile: mongoose.Schema.Types.String,
});

const UsersModel = mongoose.model('users', userSchema);

export default UsersModel;
