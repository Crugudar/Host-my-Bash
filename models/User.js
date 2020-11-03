const mongoose = require("mongoose");
const Plan = require("../models/Plan");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  imgPath:{type:String},
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHotel: { type: Boolean, default: false },
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
});

userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);

module.exports = User;
