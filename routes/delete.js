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
        
        const deleteBooking = await Booking.findByIdAndRemove(bookingId);
        const thisUser= await User.findById(req.userID);
        let arr=thisUser.reservations;

        console.log('TODAS LAS RESERVASSSSSSSSSSSSSSSSS',arr);

        let position=arr.indexOf(bookingId);

        console.log('POSICIÓN EN RESERVAAAAAAAAAAAAAASS', position);

        let modificada=arr.splice(position,1);

        console.log('DEBERÍA ESTAR MODIFICADOOOOOOOOOOOOO',modificada);

        await User.findOneAndUpdate(req.userID, {$set:{reservations: modificada}},{new: true});


        console.log('TODAS LAS RESERVASSSSSSSSSSSSSSSSS',req.userID.reservations);

     res.redirect('/profile')
    } catch (error) {
        
    }
    
});


module.exports = router;
