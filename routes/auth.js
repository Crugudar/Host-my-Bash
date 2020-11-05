var express = require("express");
var router = express.Router();

// User model
const User = require("../models/User");

// Bcrypt para encriptar passwords
const bcrypt = require("bcryptjs");

//requerimos paquete 'jsonwebtoken'
const jwt = require("jsonwebtoken");

// //agregar este middleware
const withAuth = require("../helpers/middleware");

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
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

// Ruta GET de 'login'
router.get("/login", (req, res, next) => {
  res.render("auth/login", { errorMessage: "" });
});

// Ruta POST de 'login'
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log;
  // Chequear si hay algún campo vacío en el formulario
  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to sign up.",
    });
    return;
  }

  try {
    // revisamos si el usuario existe en la BD
    const user = await User.findOne({ email });
    //console.log(user);
    if (!user) {
      res.render("auth/login", {
        errorMessage: "The email doesn't exist.",
      });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      const userWithoutPass = await User.findOne({ email }).select("-password");
      const payload = { userID: userWithoutPass._id };
      const token = jwt.sign(payload, process.env.SECRET_SESSION, {
        expiresIn: "3h",
      });

      // enviamos en la respuesta una cookie con el token (recordar agregar el {httpOnly: true} en la respuesta) y luego redirigimos a la home
      res.cookie("token", token, { httpOnly: true });
     
      res.status(200).redirect("/");
    } else {
      res.render("auth/login", {
        errorMessage: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//Ruta GET de 'logout'
router.get("/logout", withAuth, (req, res) => {
  // Setear el token con un valor vacío y una fecha de expiración en el pasado
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/");
});

module.exports = router;
