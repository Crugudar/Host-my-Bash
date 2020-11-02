var express = require("express");
const withAuth = require("../helpers/middleware");
const { bar } = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const Booking = require("../models/Booking");
const User = require("../models/User");


//Ruta post donde recoge todos los detalles de la reserva para renderizarlos en el perfil del usuario

router.post("/booking/:_id/:date/:people", withAuth, async (req, res, next) => {
  //console.log(req.body);
  
  const num = req.params.people;
  //Necesitamos traer como un array de objetos a los invitados
  const { attendeename, attendee1lastname, attendee1phone } = req.body;
  const attendeeArr = [];
  //Primer "for" para crear el hueco de los objetos de invitados en el array
  for (let i = 0; i < num; i++) {
    attendeeArr.push({ name: "", lastname: "", phone: null });
  }
  //Segundo "for" coger los objetos para modificarle los valores
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
    const newBooking = await Booking.create(reserva);
    //console.log(newBooking);
    await Plan.findByIdAndUpdate(
      planId,
      { $push: { reserved: day } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.userID,
      { $push: { reservations: newBooking._id } },
      { new: true }
    );
    res.render("users/confirmation");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
