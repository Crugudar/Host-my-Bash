var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User");
const Booking = require ("../models/Booking");

//Ruta GET profile
router.get("/profile", withAuth, async (req, res, next) => {
  const thisUser = await User.findOne({ _id: req.userID }).populate({
    path: "reservations",
    model: "Booking",
    populate: { path: "plan", model: "Plan" },
  });

  //console.log(thisUser.reservations[0]);
  res.render("users/profile", { thisUser });
});

//Ruta GET para ir al formulario de reserva incluyendo los detalles de las personas, del plan, y del día
router.get("/booking/:_id/:date/", withAuth, async (req, res, next) => {
  const num = req.query.people;
  const planId = req.params._id;
  const planDetail = await Plan.findById(req.params._id);
  const day = req.params.date;
  const reserva = {
    date: day,
    _id: planId,
    planDetail,
    people: num,
  };
console.log("RESERVAAAAAAAA", reserva)
  res.render("users/booking", { reserva });
});

module.exports = router;
