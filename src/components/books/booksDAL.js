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
};

export default booksDAL;
