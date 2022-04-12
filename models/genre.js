const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 100 },
}, { collection: 'mozlib_genres' });

// Virtual for genre's url
genreSchema.virtual('url')
  .get(function () {
    return `/catalog/genre/${this._id}`;
  });

module.exports = mongoose.model('Genre', genreSchema);