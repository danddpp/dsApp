var router = require('express').Router();

    router.get('/', function(req, res) {
    	res.render('home/index', { title: 'dsApp' });
    });


module.exports = router;
