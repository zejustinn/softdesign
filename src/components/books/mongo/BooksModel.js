import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
  author: mongoose.Schema.Types.String,
  genre: mongoose.Schema.Types.String,
  isRented: { type: mongoose.Schema.Types.Boolean, default: false },
});

const BooksModel = mongoose.model('books', bookSchema);

export default BooksModel;
