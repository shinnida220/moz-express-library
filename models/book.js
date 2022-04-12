const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
}, { collection: 'mozlib_books' });

bookSchema.virtual('url')
  .get(function () {
    return `/catalog/book/${this._id}`;
  });

// Export model
module.exports = mongoose.model('Book', bookSchema);