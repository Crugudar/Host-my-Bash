var express = require("express");
var router = express.Router();

// User model
const User = require("../models/User");

// Bcrypt para encriptar passwords
const bcrypt = require("bcryptjs");

//requerimos paquete 'jsonwebtoken'
const jwt = require("jsonwebtoken");

// //agregar este middleware 
const withAuth = require('../helpers/middleware');

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
        isHotel:true
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
  
    if(res.locals.currentUserInfo) {
      let tieneHotel = false
      const user = res.locals.currentUserInfo
      //console.log ("HOLAAAAAAAAA", user.isHotel)
      
      user.isHotel ? tieneHotel = true : tieneHotel = false
      //console.log("FUNCIONAAAAAA?????", tieneHotel)
      res.render("users/hotel_profile", {tieneHotel:tieneHotel,thisUser:thisUser});
      
    } else {
      res.render("users/hotel_profile");
    }
    
  }
catch (err){
  console.log (err)
}});


module.exports = router;
