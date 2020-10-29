const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const planSchema = new Schema({
    image:{type:String},
    planName:{type:String, required:true},
    description:{type:String, required:true},
    streetName:{type:String},
    streetNumber:{type:Number},
    zipcode:{type:Number},
    city:{type:String},
    phone: {type:Number},
    reserved:[{type:Date,default:null}]
    
});
  
  planSchema.set('timestamps', true);
  
  const Plan = mongoose.model('Plan', planSchema);
  
  module.exports = Plan;


    