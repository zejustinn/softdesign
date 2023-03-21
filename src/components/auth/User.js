import { validate } from 'jsonschema';
import ServerError from '../utils/ServerError.js';
import utils from '../utils/utils.js';

export default class User {
  constructor({
    id = undefined,
    email = undefined,
    password = undefined,
    name = undefined,
    profile = undefined,
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.profile = profile;
  }

  validateRequiredContent = () => {
    const { errors } = validate(this, {
      type: 'object',
      properties: {
        email: { type: 'string', required: true },
        password: { type: 'string', required: true },
      },
    });

    if (errors.length !== 0)
      throw new ServerError(
        400,
        utils.formatJsonSchemaValidationErrors(errors)
      );
  };

  getPublicData = () => {
    const result = {};

    if (this.id !== undefined) result.id = this.id;
    if (this.email !== undefined) result.email = this.email;
    if (this.name !== undefined) result.name = this.name;
    if (this.profile !== undefined) result.profile = this.profile;

    return result;
  };

  toJSON = () => {
    const result = {};

    if (this.id !== undefined) result.id = this.id;
    if (this.email !== undefined) result.email = this.email;
    if (this.password !== undefined) result.password = this.password;
    if (this.name !== undefined) result.name = this.name;
    if (this.profile !== undefined) result.profile = this.profile;

    return result;
  };
}
