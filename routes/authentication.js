var router = require('express').Router();
var passport = require('passport'); 
var logout = require('express-passport-logout');
var Usuario = require('.././models/Usuario');
var testAuth = require('.././middlewares/testFieldsLogin');



router.post('/login', testAuth, passport.authenticate('local'),
    function(req, res, next) {
        res.redirect('/menu-principal');
});

router.get('/logout', function(req, res, next) {
        req.logout();
        req.session.destroy(function (err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
});

module.exports = router;
                   

		 

