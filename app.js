require('dotenv').config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const hbs=require('hbs');

hbs.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});

const favicon = require("serve-favicon");
const mongoose = require("mongoose");



var indexRouter = require("./routes/index");
var publicRouter = require("./routes/public");
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var usersCopyRouter = require("./routes/userscopy");
var usersEditRouter = require("./routes/users_edit");
var usersDeleteRouter = require("./routes/delete");
var hotelsRouter = require("./routes/hotels");


var javaScripts = require('./public/javascripts');

mongoose.connect('mongodb://localhost/Host-my-bash', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", publicRouter);
app.use("/", usersRouter);
app.use("/", usersCopyRouter);
app.use("/", usersEditRouter);
app.use("/", usersDeleteRouter);
app.use("/", hotelsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

app.listen(3000, () => console.log("Host my Bash! on 3000"));
