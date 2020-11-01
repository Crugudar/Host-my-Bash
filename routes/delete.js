var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User");
const Booking = require ("../models/Booking");


router.get('/delete/:_id', withAuth, async(req, res, next)=>{
    
    try {
        const bookingId = req.params._id;
    const editBooking = await Booking.findByIdAndRemove(bookingId);
     res.redirect('/profile')
    } catch (error) {
        
    }
    
});


module.exports = router;
