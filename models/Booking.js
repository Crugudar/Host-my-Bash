const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
   
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    estancia:{type:Schema.Types.ObjectId, ref:'Estancia'},
    date: {type: Date},
    pack: {type:String},
    invited:[{type:String}]
  });
  
  bookingSchema.set('timestamps', true);
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  module.exports = Booking;
