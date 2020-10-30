var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");



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

  res.render("users/booking", { reserva });
});

module.exports = router;
