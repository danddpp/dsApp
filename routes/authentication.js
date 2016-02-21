var router = require('express').Router();
var passport = require('passport'); 
var Usuario = require('.././models/Usuario');
var test = require('.././middlewares/testFieldsLogin');



router.post('/login', test, passport.authenticate('local'),
    function(req, res, next) {
    	
        res.redirect('/menu-principal');
});

router.all('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
                   

		 

