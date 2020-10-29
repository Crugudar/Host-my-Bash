var express = require('express');
var router = express.Router();

//agregar este middleware 
const withAuth = require('../helpers/middleware')

/* GET home page. */
router.get('/', withAuth, function(req, res, next) {
  res.render('index', { title: 'Host my bash!' });
});

module.exports = router;

