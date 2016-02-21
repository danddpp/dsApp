var router = require('express').Router();
var passport = require('passport');

    router.get('/menu-principal', function(req, res) {
        if(req.isAuthenticated()) {
           var username = req.user.nome; 
    	   res.render('menu-principal/index', {nome: username});
        } else {
        	res.redirect('/');
        }
    });


module.exports = router;
