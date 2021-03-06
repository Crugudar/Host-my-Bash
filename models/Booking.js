const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
   
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    plan:{type:Schema.Types.ObjectId, ref:'Plan'},
    date: {type: String},
    invited:[{type:Object}]
  });
  
  bookingSchema.set('timestamps', true);
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  module.exports = Booking;
