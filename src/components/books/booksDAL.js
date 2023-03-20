import utils from '../utils/utils.js';
import Book from './Book.js';
import BooksModel from './mongo/BooksModel.js';

const booksDAL = {
  getAllBooks: async (book, { numberPerPage = 10, pageNumber = 1 } = {}) => {
    const mongoConnection = await utils.startMongoConnection();

    const queryFilter = book.createMongoFilter();
    const validNumberPerPage = booksDAL.getValidNumberPerPage(numberPerPage);
    const validPageNumber = booksDAL.getValidPageNumber(pageNumber);

    const books = (
      await booksDAL.findBooks(queryFilter, validPageNumber, validNumberPerPage)
    ).map(({ id, title, isRented }) => {
      return new Book({ id, title, isRented });
    });

    const collectionLegth = await booksDAL.getBooksCollectionLength(
      queryFilter
    );

    await utils.endMongoConnection(mongoConnection);

    return {
      pages: booksDAL.calculatePageQuantity(
        collectionLegth,
        validNumberPerPage
      ),
      quantity: books.length,
      pageNumber: validPageNumber,
      numberPerPage: validNumberPerPage,
      books,
    };
  },

  getValidNumberPerPage: (numberPerPage) => {
    return numberPerPage > 10 ? 10 : Number(numberPerPage);
  },

  getBooksCollectionLength: async (queryFilter) => {
    return await BooksModel.count(queryFilter);
  },

  findBooks: async (queryFilter, pageNumber, numberPerPage) => {
    return await BooksModel.find(queryFilter, {
      id: 1,
      title: 1,
      isRented: 1,
    })
      .skip((pageNumber - 1) * numberPerPage)
      .limit(numberPerPage)
      .sort('title');
  },

  getValidPageNumber: (pageNumber) => {
    return pageNumber < 1 ? 1 : Number(pageNumber);
  },

  calculatePageQuantity: (collectionLength, numberPerPage) => {
    return Math.ceil(collectionLength / numberPerPage);
  },

  getBook: async (id) => {
    const mongoConnection = await utils.startMongoConnection();

    const result = await booksDAL.findBook(id);

    await utils.endMongoConnection(mongoConnection);

    return new Book(result);
  },

  findBook: async (id) => {
    return await BooksModel.findById(id);
  },

  toggleBookState: async (book) => {
    const mongoConnection = await utils.startMongoConnection();

    const result = await booksDAL.findOneAndUpdate(book);

    await utils.endMongoConnection(mongoConnection);

    return new Book(result);
  },

  findOneAndUpdate: async (book) => {
    return await BooksModel.findOneAndUpdate(
      { _id: book.id },
      { isRented: !book.isRented },
      { returnOriginal: false }
    );
  },

  createBook: async (book) => {
    const mongoConnection = await utils.startMongoConnection();

    const result = await booksDAL.mongoCreateBook(book);

    await utils.endMongoConnection(mongoConnection);

    return new Book(result);
  },

  mongoCreateBook: async (book) => {
    return await BooksModel.create(book);
  },

  updateBook: async (book) => {
    const mongoConnection = await utils.startMongoConnection();

    const result = await booksDAL.mongoUpdateBook(
      book.id,
      book.createMongoUpdateQuery()
    );

    await utils.endMongoConnection(mongoConnection);

    return new Book(result);
  },

  mongoUpdateBook: async (id, updateQuery) => {
    return await BooksModel.findByIdAndUpdate(id, updateQuery, {
      returnOriginal: false,
    });
  },

  deleteBook: async (book) => {
    const mongoConnection = await utils.startMongoConnection();

    const result = await booksDAL.mongoDeleteBook(book.id);

    await utils.endMongoConnection(mongoConnection);

    return new Book(result);
  },

  mongoDeleteBook: async (id) => {
    return await BooksModel.findOneAndDelete({ _id: id });
  },
};

export default booksDAL;
