const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const authorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
}, { collection: 'mozlib_authors' });

// authorSchema.set('toObject', { virtuals: true })
// authorSchema.set('toJSON', { virtuals: true })

// Virtual for author's full name
authorSchema.virtual('name')
  .get(function () {
    let fullname = '';
    if (this.first_name && this.family_name) {
      fullname = this.family_name + ', ' + this.first_name;
    }
    if (!this.first_name || !this.family_name) {
      fullname = '';
    }
    return fullname;
  });


// Virtual for author's lifespan
authorSchema.virtual('lifespan')
  .get(function () {
    let lifetime_string = '';
    if (this.date_of_birth) {
      // lifetime_string = this.date_of_birth.getYear().toString();
      lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
      // lifetime_string += this.date_of_death.getYear();
      lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    return lifetime_string;
  });

// Virtual for author's URL
authorSchema.virtual('url')
  .get(function () {
    return `/catalog/author/${this._id}`;
  });

//Export model
module.exports = mongoose.model('Author', authorSchema);