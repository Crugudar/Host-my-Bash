var express = require("express");
const withAuth = require("../helpers/middleware");
const { one } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const User = require("../models/User");
const Booking = require ("../models/Booking");


//Ruta GET editar invitados de la booking
router.get("/editbookings/:_id", withAuth, async (req, res, next) => {
  const bookingId = req.params._id;
  console.log("BOOKINGID",bookingId)
  const editBooking = await Booking.findById(bookingId);
  console.log("EDIIIIITI BOOOOKING", editBooking)
  res.render("users/edit", {editBooking});
})

//Ruta POST editar invitados de la booking
router.post("/editbookings/:_id", withAuth, async (req, res, next) => {
  const bookingId = req.params._id;
  console.log("BOOKINGID",bookingId)
  const { attendeename, attendee1lastname, attendee1phone } = req.body;
  const attendeeArr = [];
  
  for (let i = 0; i < attendeename.length; i++) {
    attendeeArr.push({ name: "", lastname: "", phone: null });
  }
  //Segundo "for" coger los objetos para modificarle los valores
  for (let i = 0; i < attendeeArr.length; i++) {
    attendeeArr[i].name = attendeename[i];
    attendeeArr[i].lastname = attendee1lastname[i];
    attendeeArr[i].phone = attendee1phone[i];
  }
  


  const editBooking = await Booking.findByIdAndUpdate(bookingId, {invited: attendeeArr},{new: true});

  const thisUser = await User.findById(req.userID).populate({
    path: "reservations",
    model: "Booking",
    populate: { path: "plan", model: "Plan" },
  });

  //console.log('Holiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', thisUser.reservations);
  //const thisUser = await User.findByIdAndUpdate(req.userID,{reservations})
  
  console.log("EDIIIIITI BOOOOKING", )
  res.render("users/profile", {thisUser});
})



module.exports = router;
