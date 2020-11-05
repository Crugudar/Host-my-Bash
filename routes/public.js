var express = require("express");
const withAuth = require("../helpers/middleware");
var router = express.Router();
const error = require("../public/javascripts");

const Plan = require("../models/Plan");

router.get("/aboutus", withAuth, (req, res, next) => {
  if(res.locals.currentUserInfo) {
    let tieneHotel = false
    const user = res.locals.currentUserInfo
    //console.log ("HOLAAAAAAAAA", user.isHotel)
    
    user.isHotel ? tieneHotel = true : tieneHotel = false
    
    //console.log("FUNCIONAAAAAA?????", tieneHotel)
    res.render("public/aboutus", {tieneHotel});
    
  } else {
    res.render("public/aboutus");
  
}});

router.get("/filter", withAuth, (req, res, next) => {
  res.render("public/filter");
  
});

router.get("/list/", withAuth, async (req, res, next) => {
  const { day } = req.query;
  //day.setHours(0,0,0,0);
  console.log('daaaaaaaaaaaaaaaaaaaaaaay',day);
  if (day==""){
    let error={
      err:'You must select a date'
    };
    res.render('public/filter', {error} );
    
    
  }

  let today= new Date();
  let selected=new Date(day);
 
  if (selected<today){
    let error={
      err:'You cannot select dates in the past'
    };
    res.render('public/filter', {error} );
    
    
  }

  //Creamos una variable donde decimos que encuentre todos los planes que no tengan la misma fecha que la que han solicitado
  const plans = await Plan.find();

  //console.log(plans);

  const availablePlans=[];

  for(let i=0; i<plans.length; i++){
    if(!plans[i].reserved.includes(day)){
      availablePlans.push(plans[i]); 
    }
  }

  //console.log(availablePlans);

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
