var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User");
const Booking = require ("../models/Booking");

//Ruta GET profile
router.get("/profile", withAuth, async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ _id: req.userID }).populate({
    path: "reservations",
    model: "Booking",
    populate: { path: "plan", model: "Plan" },
  });

  //console.log(thisUser.reservations[0]);
  res.render("users/profile", { thisUser });
  } catch (error) {
    console.log(error)
  }
  
});

//Ruta GET para ir al formulario de reserva incluyendo los detalles de las personas, del plan, y del día
router.get("/booking/:_id/:date/", withAuth, async (req, res, next) => {
  const num = req.query.people;
  const inviting=(req.query.people)-1;
 
  const planId = req.params._id;
  const planDetail = await Plan.findById(req.params._id);
  const day = req.params.date;
  const thisUser= await User.findById(req.userID);

  //console.log('usuario que va a hecer una reserva',thisUser);

  
  const reserva = {
    name:thisUser.username,
    lastname:thisUser.lastname,
    date: day,
    _id: planId,
    planDetail,
    people: num,
    inviting:inviting,
  };
console.log("RESERVAAAAAAAA", reserva)
  res.render("users/booking", { reserva });
});

module.exports = router;
