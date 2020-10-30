var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();

router.get('/booking', withAuth, (req, res, next)=>{
  const num=req.query.people;
  
    res.render('users/booking', {num});
});

router.post('/booking', withAuth,async (req, res, next)=>{
 console.log('ehhhhhhhhhhhhhhhhhhhhhhhhhhh',req.body.attendeename[0]);
 
 
  //  necesitamos tener idUsuario, atendees(check), fecha (problema), idPlan(problema)

  // const newBooking= await Booking.create()
 
  res.render('user/confimation');

});

module.exports = router;