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
        'It is not possible to rent this book. It is currently rented'
      );

    const bookRented = await BooksDAL.toggleBookState(bookToRent);

    return bookRented;
  },
};

export default booksService;
