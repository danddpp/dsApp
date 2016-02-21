var router = require('express').Router();

    router.get('/', function(req, res) {
    	res.render('home/index', { title: 'dsApp' });
    });


module.exports = router;
/*module.exports = function(app) {
    var AuthCtrl = app.controllers.authentication;
    
    app.post('/login', AuthCtrl.login);
    //app.get('/logout', AuthenticationCtrl.logout);    
}
*/


