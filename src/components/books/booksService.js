import BooksDAL from './booksDAL.js';

const booksService = {
  getAllBooks: async (book, numberPerPage, pageNumber) => {
    return await BooksDAL.getAllBooks(book, { numberPerPage, pageNumber });
  },

  getBook: async (id) => {
    return await BooksDAL.getBook(id);
  },
};

export default booksService;
