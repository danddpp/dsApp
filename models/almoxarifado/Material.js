var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var entrada = {
    dataEntrada: Date,
    num_nf: Number,
    dataEmissaoNf: Date,
    fornecedor: String,
    qtde: Number
};

var saida = {
    dataSaida: Date,
    qtde: Number
};

var Material = new Schema({
  nome: String,
  unidade: String,
  estoque_min: Number,
  estoque_atual: Number,
  status: String,
  observacao: String,
  entradas: [entrada],
  saidas:   [saida]
});


Material.estoque_atual = 0;

module.exports = mongoose.model('material', Material);
