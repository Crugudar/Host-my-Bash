var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const Booking = require("../models/Booking");

router.post("/booking/:_id/:date/:people", withAuth, async (req, res, next) => {
  console.log("INVITADOOOOOOOOOS", req.body);
  const num = req.params.people;
  const { attendeename, attendee1lastname, attendee1phone } = req.body;
  const attendeeArr = [];
  for (let i = 0; i < num; i++) {
    attendeeArr.push({ name: "", lastname: "", phone: null });
  }
  for (let i = 0; i < attendeeArr.length; i++) {
    attendeeArr[i].name = attendeename[i];
    attendeeArr[i].lastname = attendee1lastname[i];
    attendeeArr[i].phone = attendee1phone[i];
  }
  //console.log(attendeeArr)
  try {
    const planId = req.params._id;
    const planDetail = await Plan.findById(req.params._id);
    const day = req.params.date;

    const reserva = {
      user: req.userID,
      plan: planId,
      date: day,
      invited: attendeeArr,
    };
    //console.log(reserva);
    //  necesitamos tener idUsuario, atendees(check), fecha (problema), idPlan(problema)
    const newBooking = await Booking.create(reserva);
    //console.log(newBooking);
    await Plan.findByIdAndUpdate(planId,{reserved});
    
    res.status(200).render("users/profile", { reserva });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
