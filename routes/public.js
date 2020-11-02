var express = require("express");
const withAuth = require("../helpers/middleware");
var router = express.Router();

const Plan = require("../models/Plan");

<<<<<<< HEAD
router.get("/filter", withAuth,(req, res, next) => {
=======
router.get("/aboutus", (req, res, next) => {
  res.render("public/aboutus");
});

router.get("/filter", (req, res, next) => {
>>>>>>> Carla-branch
  res.render("public/filter");
});

router.get("/list/", withAuth, async (req, res, next) => {
  const { day } = req.query;
  console.log(day);
  //Creamos una variable donde decimos que encuentre todos los planes que no tengan la misma fecha que la que han solicitado
  const availablePlans = await Plan.find({ reserved: { $ne: req.day } });
  //Creamos una variable que incluya el plan y el día para luego poder renderizarlo
  var reserva = {
    availablePlans,
    date: day,
  };
  //console.log(reserva);
  res.render("public/hotels", { reserva });
});
//Ruta get: veremos el detalle del plan con el ID del plan y la fecha
router.get("/details/:_id/:date", withAuth, async (req, res, next) => {
  //Creamos una variable que incluya el id del plan (para que solamente muestre ese)
  const planDetail = await Plan.findById(req.params._id);
  const day = req.params.date;
  const planId = req.params._id;
  //Creamos una variable reserva que incluya la fecha, el id y el detalle. Luego lo renderizaremos
  const reserva = {
    date: day,
    _id: planId,
    planDetail,
  };
  // console.log(selectedDate);

  res.render("public/details", { reserva });
});

module.exports = router;
