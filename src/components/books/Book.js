import { validate } from 'jsonschema';
import mongoose from 'mongoose';
import ServerError from '../utils/ServerError.js';
import utils from '../utils/utils.js';

export default class Book {
  constructor({
    id = undefined,
    title = undefined,
    description = undefined,
    author = undefined,
    genre = undefined,
    isRented = undefined,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.genre = genre;
    this.setIsRented(isRented);
  }

  setIsRented = (isRented) => {
    if (isRented === undefined) return;

    if (typeof isRented === 'string') {
      this.isRented = isRented === 'true';
    } else {
      this.isRented = isRented;
    }
  };

  validateOptionContent = () => {
    const { errors } = validate(this, {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string', maxLength: 200 },
        description: { type: 'string', maxLength: 2000 },
        author: { type: 'string', maxLength: 100 },
        genre: { type: 'string', maxLength: 100 },
        isRented: { type: 'boolean' },
      },
    });

    if (this.id && !mongoose.isValidObjectId(this.id))
      throw new ServerError(400, 'Given ID can not be casted to ObjectId');

    if (errors.length !== 0)
      throw new ServerError(
        400,
        utils.formatJsonSchemaValidationErrors(errors)
      );
  };

  createMongoFilter = () => {
    const result = {};

    if (this.title !== undefined) result.title = { $regex: this.title };
    if (this.description !== undefined)
      result.description = { $regex: this.description };
    if (this.author !== undefined) result.author = { $regex: this.author };
    if (this.genre !== undefined) result.genre = { $regex: this.genre };
    if (this.isRented !== undefined) result.isRented = this.isRented;

    return result;
  };

  validateRequiredId = () => {
    const { errors } = validate(this, {
      type: 'object',
      properties: {
        id: { type: 'string', required: true },
        title: { type: ['string', 'null'], maxLength: 200 },
        description: { type: ['string', 'null'], maxLength: 2000 },
        author: { type: ['string', 'null'], maxLength: 100 },
        genre: { type: ['string', 'null'], maxLength: 100 },
        isRented: { type: 'boolean' },
      },
    });

    if (this.id && !mongoose.isValidObjectId(this.id))
      throw new ServerError(400, 'Given ID can not be casted to ObjectId');

    if (errors.length !== 0)
      throw new ServerError(
        400,
        utils.formatJsonSchemaValidationErrors(errors)
      );
  };

  validateRequiredTitle = () => {
    const { errors } = validate(this, {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string', maxLength: 200, required: true },
        description: { type: 'string', maxLength: 2000 },
        author: { type: 'string', maxLength: 100 },
        genre: { type: 'string', maxLength: 100 },
        isRented: { type: 'boolean' },
      },
    });

    if (this.id && !mongoose.isValidObjectId(this.id))
      throw new ServerError(400, 'Given ID can not be casted to ObjectId');

    if (errors.length !== 0)
      throw new ServerError(
        400,
        utils.formatJsonSchemaValidationErrors(errors)
      );
  };

  validateRequiredIdAnTitle = () => {
    const { errors } = validate(this, {
      type: 'object',
      properties: {
        id: { type: 'string', required: true },
        title: { type: 'string', maxLength: 200, required: true },
        description: { type: 'string', maxLength: 2000 },
        author: { type: 'string', maxLength: 100 },
        genre: { type: 'string', maxLength: 100 },
        isRented: { type: 'boolean' },
      },
    });

    if (this.id && !mongoose.isValidObjectId(this.id))
      throw new ServerError(400, 'Given ID can not be casted to ObjectId');

    if (errors.length !== 0)
      throw new ServerError(
        400,
        utils.formatJsonSchemaValidationErrors(errors)
      );
  };

  createMongoUpdateQuery = () => {
    const result = {};

    if (this.title !== undefined) result.title = this.title;
    if (this.description !== undefined) result.description = this.description;
    if (this.author !== undefined) result.author = this.author;
    if (this.genre !== undefined) result.genre = this.genre;
    if (this.isRented !== undefined) result.isRented = this.isRented;

    return result;
  };

  toString = () => {
    const result = {};

    if (this.id !== undefined) result.id = this.id;
    if (this.title !== undefined) result.title = this.title;
    if (this.description !== undefined) result.description = this.description;
    if (this.author !== undefined) result.author = this.author;
    if (this.genre !== undefined) result.genre = this.genre;
    if (this.isRented !== undefined) result.isRented = this.isRented;

    return result;
  };
}
