var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var Material = new Schema({
  nome: String,
  unidade: String,
  estoque_min: String,
  status: String,
  observacao: String
});




module.exports = mongoose.model('material', Material);
