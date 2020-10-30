var express = require('express');
var router = express.Router();

const Plan = require('../models/Plan');


router.get('/filter', (req, res, next)=>{
 res.render('public/filter');
});

router.get('/list/', async(req, res, next)=>{
 const {day}=req.query;
 console.log(day);
 

 const availablePlans= await Plan.find({reserved:{$ne: req.day}});
  
  var reserva = {
    availablePlans,
    date: day,
  }
  // availablePlans.unshift(day);
  //   const reserva={
  //   date:day,
  //   availablePlans:availablePlans
  // };

  console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', reserva);
  res.render('public/hotels', {reserva});
  
});



router.get('/details/:_id/:date', async(req, res, next)=>{
  const planDetail= await Plan.findById(req.params._id);
  const day = req.params.date;
  const planId = req.params._id;
  const reserva = {
    date:day,
    _id:planId,
    planDetail
  }

  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' , selectedDate);

  res.render('public/details', {reserva});
})

module.exports = router;
