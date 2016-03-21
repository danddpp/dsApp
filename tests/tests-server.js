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



var usuario = require('../models/Usuario');
var passport = require('passport');
var testAuth = require('.././middlewares/testFieldsLogin');
describe('Usuarios', function() {
    
    usuario.collection.drop();
    
    beforeEach(function(done) {
           var newUser = new usuario({
            username: 'fulano@test',
            password: '123',
            nome: 'fulano',
            roles: ['user']
        });
        newUser.save(function(err) {
            done();
        });
    });

    afterEach(function(done) {
        usuario.collection.drop();
        done();
    });

    
    it('Deve retornar um usuario em /login', function(done) {
        chai.request(server)  
        .post('login', testAuth, passport.authenticate('local'))
        .end(function(err,res) {
           res.should.have.status(200);
           done();  
         });
    });

});




