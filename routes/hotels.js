var express = require("express");
var router = express.Router();
const uploadCloud = require("../config/cloudinary");
// User model
const User = require("../models/User");

// Bcrypt para encriptar passwords
const bcrypt = require("bcryptjs");

//requerimos paquete 'jsonwebtoken'
const jwt = require("jsonwebtoken");

// //agregar este middleware
const withAuth = require("../helpers/middleware");
const Plan = require("../models/Plan");

//Ruta GET - Signup
router.get("/hotelsignup", function (req, res, next) {
  res.render("auth/hotelsignup", { errorMessage: "" });
});

//Ruta POST - Signup
router.post("/hotelsignup", async (req, res, next) => {
  const {
    username,
    lastname,
    email,
    verifyemail,
    password,
    verifypassword,
  } = req.body;
  //Chequear si hay algún campo vacío en el formulario
  if (
    username == "" ||
    email == "" ||
    verifyemail == "" ||
    password == "" ||
    verifypassword == ""
  ) {
    res.render("auth/hotelsignup", {
      errorMessage: "Some fields are incomplete.",
    });
    return;
  }
  //Buscar si el usuario ya está en nuestra BBDD
  try {
    const user = await User.findOne({ email: email });
    if (user !== null) {
      res.render("auth/hotelsignup", {
        errorMessage: "The email already exists!",
      });
      return;
    }
    //Crear usuario + generar password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    await User.create({
      username,
      email,
      password: hashPass,
      isHotel: true,
    });
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

router.get("/hotelprofile", withAuth, async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ _id: req.userID }).populate({
      path: "plans",
      model: "Plan",
      // populate: { path: "plan", model: "Plan" },
    });

    if (res.locals.currentUserInfo) {
      let tieneHotel = false;
      let tieneReservas = false;
      const user = res.locals.currentUserInfo;
      //console.log ("HOLAAAAAAAAA", user.isHotel)

      user.isHotel ? (tieneHotel = true) : (tieneHotel = false);

      //user.plans.length > 0 ? (tieneReservas = true) : (tieneReservas = false);

      //console.log("USERS PLANS LENGTH", user.plans.length)

      res.render("users/hotel_profile", {
        tieneHotel: tieneHotel,
        tieneReservas: tieneReservas,
        thisUser: thisUser,
      });
    } else {
      res.render("users/hotel_profile");
    }
  } catch (err) {
    console.log(err);
  }
});

//Ruta crear plan GET
router.get("/createaplan", withAuth, (req, res, next) => {
  res.render("users/addPlan");
});

//Ruta crear plan POST
router.post(
  "/createaplan",
  uploadCloud.single("image"),
  withAuth,
  async (req, res, next) => {
    const image = req.file.url;
    const {
      planName,
      description,
      streetName,
      streetNumber,
      zipcode,
      city,
      phone,
    } = req.body;

    const createPlan = {
      image,
      planName,
      description,
      streetName,
      streetNumber,
      zipcode,
      city,
      phone,
    };

    const newPlan = await Plan.create(createPlan);

    await User.findByIdAndUpdate(
      req.userID,
      { $push: { plans: newPlan._id } },
      { new: true }
    );
    res.redirect("/hotelprofile");
  }
);
//Ruta GET eliminar los planes de los HOTELES
router.get("/deleteplans/:_id", withAuth, async (req, res, next) => {
  const plansId = req.params._id;
  //console.log("PLANSID", plansId);
  const deletePlans = await Plan.findById(plansId);
  //console.log("DELETEEEEE PLAAAAANS", deletePlans)
  const error = {
    errorMessage:
      "Unfortunately you cannot delete this plan due to there are some tickets sold.",
  };
  let tieneHotel = false
  const user = res.locals.currentUserInfo
  if (deletePlans.reserved.length > 0 && res.locals.currentUserInfo) {
    user.isHotel ? tieneHotel = true : tieneHotel = false
    res.render("users/delete_plans", { error, tieneHotel});
  } else {
    const user = await User.findById(req.userID);
    let array = user.plans;
    let position = array.indexOf(plansId);
    array.splice(position, 1);
    await User.findOneAndUpdate(req.userID, { plans: array }, { new: true });
    await Plan.findByIdAndRemove(plansId);
    res.redirect("/hotelprofile");
  }
});


//Ruta GET editar los planes de los HOTELES
router.get("/editplans/:_id", withAuth, async (req, res, next) => {
  const plansId = req.params._id;
  //console.log("PLANSID",plansId)
  const editPlans = await Plan.findById(plansId);
  //console.log("EDIIIIITI PLAAAAANS", editPlans)
  res.render("users/edit_plans", { editPlans });
});

//Ruta POST editar los planes de los HOTELES
router.post("/editplans/:_id", withAuth, async (req, res, next) => {
  const plansId = req.params._id;
  const { planName, description } = req.body;
  Plan.update(
    { _id: plansId },
    { $set: { planName, description } },
    { new: true }
  ).then(
    function (data) {
      res.redirect("/hotelprofile");
    },
    function (err) {
      next(err);
      console.log("Something went wrong!", err);
    }
  );
});

module.exports = router;
