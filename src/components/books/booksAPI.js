import { Router } from 'express';
import utils from '../utils/utils.js';
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
    const serverResponse = await booksController.getAllBooks(
      title,
      description,
      author,
      genre,
      isRented,
      numberPerPage,
      pageNumber
    );

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

booksAPI.get('/:id', async (req, res) => {
  try {
    const serverResponse = await booksController.getBook(req.params.id);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

booksAPI.post('/:id/rent', async (req, res) => {
  try {
    const serverResponse = await booksController.rentBook(req.params.id);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

booksAPI.post('/:id/returnRented', async (req, res) => {
  try {
    const serverResponse = await booksController.returnRentedBook(
      req.params.id
    );

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

booksAPI.post('/', async (req, res) => {
  try {
    const { title, description, author, genre, isRented } = req.body;
    const serverResponse = await booksController.createBook(
      title,
      description,
      author,
      genre,
      isRented
    );

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

booksAPI.patch('/:id', async (req, res) => {
  try {
    const { title, description, author, genre, isRented } = req.body;
    const serverResponse = await booksController.updateBook(
      req.params.id,
      title,
      description,
      author,
      genre,
      isRented
    );

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

booksAPI.delete('/:id', async (req, res) => {
  try {
    const serverResponse = await booksController.deleteBook(req.params.id);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  } catch (error) {
    const serverResponse = utils.generateServerResponseFromError(error);

    res
      .contentType(serverResponse.contentType)
      .status(serverResponse.statusCode)
      .send(serverResponse);
  }
});

export default booksAPI;
