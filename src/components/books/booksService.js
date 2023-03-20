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

    const bookRented = await BooksDAL.toggleBookState(bookToRent);

    return bookRented;
  },

  returnRentedBook: async (id) => {
    const bookToReturn = await BooksDAL.getBook(id);

    if (!bookToReturn.isRented)
      throw new Error(
        'It is not possible to return a book that it not rented.'
      );

    const returnedBook = await BooksDAL.toggleBookState(bookToReturn);

    return returnedBook;
  },

  createBook: async (book) => {
    return await BooksDAL.createBook(book);
  },
};

export default booksService;
