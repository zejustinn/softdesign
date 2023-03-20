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

booksAPI.get('/:id', async (req, res) => {
  try {
    const book = await booksController.getBook(req.params.id);

    res.contentType('application/json').status(200).send({ data: book });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

booksAPI.post('/:id/rent', async (req, res) => {
  try {
    const book = await booksController.rentBook(req.params.id);

    res.contentType('application/json').status(200).send({ data: book });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

booksAPI.post('/:id/returnRented', async (req, res) => {
  try {
    const book = await booksController.returnRentedBook(req.params.id);

    res.contentType('application/json').status(200).send({ data: book });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

booksAPI.post('/', async (req, res) => {
  try {
    const { title, description, author, genre, isRented } = req.body;
    const book = await booksController.createBook(
      title,
      description,
      author,
      genre,
      isRented
    );

    res.contentType('application/json').status(201).send({ data: book });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

booksAPI.patch('/:id', async (req, res) => {
  try {
    const { title, description, author, genre, isRented } = req.body;
    const book = await booksController.updateBook(
      req.params.id,
      title,
      description,
      author,
      genre,
      isRented
    );

    res.contentType('application/json').status(200).send({ data: book });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

booksAPI.delete('/:id', async (req, res) => {
  try {
    const book = await booksController.deleteBook(req.params.id);

    res.contentType('application/json').status(200).send({ data: book });
  } catch (error) {
    res
      .contentType('application/json')
      .status(500)
      .send({ error: { message: error.message } });
  }
});

export default booksAPI;
