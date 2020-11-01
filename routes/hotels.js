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
router.get("/signup", function (req, res, next) {
  res.render("auth/signup", { errorMessage: "" });
});

//Ruta POST - Signup
router.post("/signup", async (req, res, next) => {
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
    lastname == "" ||
    email == "" ||
    verifyemail == "" ||
    password == "" ||
    verifypassword == ""
  ) {
    res.render("auth/signup", {
      errorMessage: "Some fields are incomplete.",
    });
    return;
  }
  //Buscar si el usuario ya está en nuestra BBDD
  try {
    const user = await User.findOne({ email: email });
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The email already exists!",
      });
      return;
    }
    //Crear usuario + generar password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    await User.create({
      username,
      lastname,
      email,
      password: hashPass,
    });
    //Redirigimos a home o a login??????????¿¿¿¿¿¿¿¿¿¿¿¿¿????????????¿¿¿¿¿¿¿¿¿¿¿ (pongo muchos para verlo)
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});



module.exports = router;
