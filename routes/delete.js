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
        //console.log('DEBERÍA ESTAR LOCOOOOOOOOOOOOOOOOOOOO', bookingId,typeof(bookingId));

        const thisUser= await User.findById(req.userID);

        //console.log('USEEEEEEEEEEEEEEEEEEEEEEER',thisUser);

        let arr=thisUser.reservations;

        let position=arr.indexOf(bookingId);

        if(arr.length==1){
                let a=await User.findOneAndUpdate(req.userID, {$set:{reservations: []}},{new: true});

                //console.log('USERARRAY1RESULTADO', a);
                await Booking.findByIdAndRemove(bookingId);
                res.redirect('/profile');
            }else{
              
                arr.splice(position,1);  
                //console.log('DEBERÍA ESTAR MODIFICADOOOOOOOOOOOOO',arr);
              
                await User.findOneAndUpdate(req.userID, {reservations: arr},{new: true});

                //console.log('TODAS LAS RESERVASSSSSSSSSSSSSSSSS',req.userID.reservations);
                const deleteBooking = await Booking.findByIdAndRemove(bookingId);
                res.redirect('/profile');
            }

    
    } catch (error) {
        console.log(error); 
    }
    
});


module.exports = router;
