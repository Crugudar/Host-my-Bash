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
 console.log(availablePlans);

 res.render('public/hotels', {availablePlans});
  
});

router.get('/details/:_id', async(req, res, next)=>{
  const planDetail= await Plan.findById(req.params._id);

  res.render('public/details', {planDetail});
})

module.exports = router;
