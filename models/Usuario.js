var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');


var Usuario = new Schema({
  username: String,
  password: String,
  nome: String,
  roles: [String]
});


//Usuario.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuario', Usuario);
