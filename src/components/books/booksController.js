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
    book.validateOptionContent();
    booksController.validateExtraContent(numberPerPage, pageNumber);

    return await booksService.getAllBooks(book, numberPerPage, pageNumber);
  },

  validateExtraContent: (numberPerPage, pageNumber) => {
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
    book.validateRequiredId();

    return await booksService.getBook(id);
  },

  rentBook: async (id) => {
    const book = new Book({ id });
    book.validateRequiredId();

    return await booksService.rentBook(id);
  },

  returnRentedBook: async (id) => {
    const book = new Book({ id });
    book.validateRequiredId();

    return await booksService.returnRentedBook(id);
  },

  createBook: async (title, description, author, genre, isRented) => {
    const book = new Book({ title, description, author, genre, isRented });
    book.validateRequiredIdAnTitle();

    return await booksService.createBook(book);
  },

  updateBook: async (id, title, description, author, genre, isRented) => {
    const book = new Book({ id, title, description, author, genre, isRented });
    book.validateRequiredId();

    return await booksService.updateBook(book);
  },

  deleteBook: async (id) => {
    const book = new Book({ id });
    book.validateRequiredId();

    return await booksService.deleteBook(id);
  },
};

export default booksController;
