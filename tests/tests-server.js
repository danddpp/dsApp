process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
//var server = require('../config/express')(app);


var should = chai.should();
chai.use(chaiHttp);


describe('Acessar a home', function() {
	
    it('Deve retornar status 200 ao acessar a home', function(done){
        chai.request(server)
        .get('/')
        .end(function(err, res) {
        	res.should.have.status(200);
            done();
        });
	});

});



var Material = require('../models/Usuario');

describe('tests', function() {
    
    usuario.collection.drop();
    
    beforeEach(function(done) {
            var newMaterial = new Schema({
              nome: 'banana',
              unidade: 'kg',
              estoque_min: '100',
              status: 'on',
              observacao: 'Bla bla bla'
            });
        });
        newMaterial.save(function(err) {
            done();
        });
    });

    afterEach(function(done) {
        Material.collection.drop();
        done();
    });

    
    it('Deve retornar um material em ', function(done) {
        chai.request(server)  
        .post('/login',testAuth)
        .end(function(err, res) {
           res.should.have.status(200);
           done();
        });
    }); 

});




