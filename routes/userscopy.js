var express = require("express");
const withAuth = require("../helpers/middleware");
const {
  bar
} = require("../public/javascripts");
var router = express.Router();
const Plan = require("../models/Plan");
const Booking = require("../models/Booking");
const User = require("../models/User");

//requerimos a cloudinary

const uploadCloud = require("../config/cloudinary");

//Ruta subir foto de perfil get

router.get('/profilephoto', withAuth,(req, res, next)=>{

  res.render('users/photoadd');
});

router.post('/profilephoto', uploadCloud.single('photo'), withAuth, async (req, res, next)=>{

const imgPath=req.file.url;


try {
  await User.findByIdAndUpdate(req.userID, {imgPath:imgPath}, {new: true});
  res.redirect('/profile');
} catch (error) {
  console.log(error);
}

});



//Ruta post donde recoge todos los detalles de la reserva para renderizarlos en el perfil del usuario

router.post("/booking/:_id/:date/:people", withAuth, async (req, res, next) => {
  console.log('helouuuuuuuuuuuuuuuuuuuuuuuu', req.body);
  // let isOnlyOne=false; 
  //Necesitamos traer como un array de objetos a los invitados
  const {
    attendeename,
    attendee1lastname,
    attendee1phone
  } = req.body;
  const attendeeArr = [];
  const num = req.params.people;
  
  //Primer "for" para crear el hueco de los objetos de invitados en el array
  for (let i = 0; i < num; i++) {
    attendeeArr.push({
      name: "",
      lastname: "",
      phone: null
    });
  }
  //   if(num==1){
  // //Si sólo hay un invitado los valores que se crearán en el objeto serán los mismos que los del form
  //     isOnlyOne=true;
  //     attendeeArr.name = attendeename;
  //     attendeeArr.lastname = attendee1lastname;
  //     attendeeArr.phone = attendee1phone;
  //   }else{
  //     isOnlyOne=false;
  //}
  //En el caso de que haya más de un invitado hacemos un segundo "for" para crear cada objeto atendee  
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
      planId, {
        $push: {
          reserved: day
        }
      }, {
        new: true
      }
    );
    await User.findByIdAndUpdate(
      req.userID, {
        $push: {
          reservations: newBooking._id
        }
      }, {
        new: true
      }
    );
    res.render("users/confirmation");
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;