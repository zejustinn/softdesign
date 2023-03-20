import BooksDAL from './booksDAL.js';

const booksService = {
  getAllBooks: async (book, numberPerPage, pageNumber) => {
    return await BooksDAL.getAllBooks(book, { numberPerPage, pageNumber });
  },

  getBook: async (id) => {
    return await BooksDAL.getBook(id);
  },

  rentBook: async (id) => {
    const bookToRent = await BooksDAL.getBook(id);

    if (bookToRent.isRented)
      throw new Error(
        'It is not possible to rent this book. It is currently rented.'
      );

    return await BooksDAL.toggleBookState(bookToRent);
  },

  returnRentedBook: async (id) => {
    const bookToReturn = await BooksDAL.getBook(id);

    if (!bookToReturn.isRented)
      throw new Error(
        'It is not possible to return a book that is not rented.'
      );

    return await BooksDAL.toggleBookState(bookToReturn);
  },

  createBook: async (book) => {
    return await BooksDAL.createBook(book);
  },

  updateBook: async (book) => {
    const bookToValidate = await BooksDAL.getBook(book.id);

    if (bookToValidate.isRented)
      throw new Error('It is not possible to update this book. It is rented.');

    const returnedBook = await BooksDAL.updateBook(book);

    return returnedBook;
  },
};

export default booksService;
