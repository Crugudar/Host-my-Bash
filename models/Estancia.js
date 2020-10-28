const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const estanciaSchema = new Schema({
    image:{type:String},
    estanciaName:{type:String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    streetName:{type:String},
    streetNumber:{type:Number},
    city:{type:String},
    zipcode:{type:Number},
    pack: [{type:String}],
    phone: {type:Number},
    invited:[{type:String}],
    bookedDates:[{type:Date}]
  });
  
  estanciaSchema.set('timestamps', true);
  
  const Estancia = mongoose.model('Estancia', estanciaSchema);
  
  module.exports = Estancia;


    