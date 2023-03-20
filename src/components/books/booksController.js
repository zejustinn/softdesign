import { validate } from 'jsonschema';
import utils from '../utils/utils.js';
import Book from './Book.js';
import booksService from './booksService.js';

const booksController = {
  getAllBooks: async (
    title,
    description,
    author,
    genre,
    isRented,
    numberPerPage,
    pageNumber
  ) => {
    const book = new Book({ title, description, author, genre, isRented });
    book.validateContent();
    booksController.validateExtraDataIfNecessary(numberPerPage, pageNumber);

    return await booksService.getAllBooks(book, numberPerPage, pageNumber);
  },

  validateExtraDataIfNecessary: (numberPerPage, pageNumber) => {
    const instance = {};

    if (!numberPerPage && !pageNumber) return;

    numberPerPage ? (instance.numberPerPage = Number(numberPerPage)) : null;
    pageNumber ? (instance.pageNumber = Number(pageNumber)) : null;

    const { errors } = validate(instance, {
      type: 'object',
      properties: {
        numberPerPage: { type: 'number' },
        pageNumber: { type: 'number' },
      },
    });

    if (errors.length !== 0)
      throw new Error(utils.formatJsonSchemaValidationErrors(errors));
  },

  getBook: async (id) => {
    const book = new Book({ id });
    book.validateContent();

    return await booksService.getBook(id);
  },

  rentBook: async (id) => {
    const book = new Book({ id });
    book.validateContent();

    return await booksService.rentBook(id);
  },

  returnRentedBook: async (id) => {
    const book = new Book({ id });
    book.validateContent();

    return await booksService.returnRentedBook(id);
  },

  createBook: async (title, description, author, genre, isRented) => {
    const book = new Book({ title, description, author, genre, isRented });
    book.validateRequiredCreationalContent();
    book.validateContent();

    return await booksService.createBook(book);
  },

  updateBook: async (id, title, description, author, genre, isRented) => {
    const book = new Book({ id, title, description, author, genre, isRented });
    book.validateRequiredUpdationalContent();

    return await booksService.updateBook(book);
  },
};

export default booksController;
