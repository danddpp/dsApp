module.exports = function(req, res, next) {
	var login = req.body.usuario.username;
	var senha = req.body.usuario.password;

	 //verifica se os campos não estão vazios
	 if(login && senha) {
	 next();
	 } else {
	 res.redirect('/');
	 }
}