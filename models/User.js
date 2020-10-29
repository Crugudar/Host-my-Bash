const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    username: { type:String, required:true, unique:true},
    lastname:{ type:String},
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true},
    isHotel:{type: Boolean, default:false},
    reservations:[{type:String, default:null}],
    plans:[{type:String, default: null}],
  });
  
  userSchema.set('timestamps', true);
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;

