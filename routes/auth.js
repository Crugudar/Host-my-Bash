var express = require("express");
var router = express.Router();

// User model
const User = require("../models/User");

// Bcrypt para encriptar passwords
const bcrypt = require("bcryptjs");

router.get("/signup", function (req, res, next) {
    res.render("auth/signup");
  });

  