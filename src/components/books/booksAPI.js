import { Router } from 'express';
import booksController from './booksController.js';

const booksAPI = Router();

booksAPI.get('/', async (req, res) => {
  try {
    const {
      title,
      description,
      author,
      genre,
      isRented,
      numberPerPage,
      pageNumber,
    } = req.query;
    const books = await booksController.getAllBooks(
      title,
      description,
      author,
      genre,
      isRented,
      numberPerPage,
      pageNumber
    );

    res.contentType('application/json').status(200).send({ data: books });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

export default booksAPI;
