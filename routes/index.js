var express = require('express');
var router = express.Router();

//agregar este middleware 
const withAuth = require('../helpers/middleware')

/* GET home page. */

router.get('/', withAuth, function(req, res, next) {
  if(res.locals.currentUserInfo) {
  let tieneHotel = false
  const user = res.locals.currentUserInfo
  //console.log ("HOLAAAAAAAAA", user.isHotel)
  
  user.isHotel ? tieneHotel = true : tieneHotel = false
  
  //console.log("FUNCIONAAAAAA?????", tieneHotel)
  res.render('index', { title: 'Host my bash!', tieneHotel});
} else {
  res.render('index', { title: 'Host my bash!'});
}
});



module.exports = router;

