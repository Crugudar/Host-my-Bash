const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    username: { type:String, required:true, unique:true},
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true},
    isHotel:false,
    reservations:[{type:String}],
    estancias:[{type:String}],
  });
  
  userSchema.set('timestamps', true);
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;

