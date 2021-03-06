var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var routeHome = require('.././routes/home');
var routeAuth = require('.././routes/authentication');
var routeMenuPrinc = require('.././routes/MenuPrincipal');
var routeAlmoxarifado = require('.././routes/almoxarifado');
var path = require('path');
var logger = require('morgan');
var load = require('express-load');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var config = require('.././config_connection');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


module.exports = function() {
  var app = express();

  configureTemplate(app);
  connectDb(app);
  configureMiddlewares(app);
  setRoutes(app);
  initializeServer(app);

  return app;
}


function configureTemplate(app) {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');
}


function connectDb(app) {
  
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

}

function configureMiddlewares(app) {
  app.use(logger('dev'));
  app.use(cookieParser('dsApp'));
  app.use(session({
   secret: 'is this secret',
   resave: true,
   saveUninitialized: false
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  //app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  
  var Usuario = require('.././models/Usuario');

  //passport.use(Usuario.createStrategy());
  //passport.serializeUser(Usuario.serializeUser());
  //passport.deserializeUser(Usuario.deserializeUser());
  passport.use(new LocalStrategy({
    usernameField: 'usuario[username]',
    passwordField: 'usuario[password]'
  },
//verificar se campos de login estão vindo vazios e implementar
//veerificação nas rotas para averiguar se existe usuario logado, a fim
//de evitar o acesso digitando a url direto no navegador
  function(username, password, done) 
  {
    Usuario.findOne({username: username, password: password}, 
      function(err, user) {
           if(user) {
              return done( null, user);       
           }

           return done(null, false, {message: 'Unable to login'});
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

}


function setRoutes(app) {
  app.get('/', routeHome);
  app.post('/login', routeAuth);
  app.get('/logout', routeAuth);
  app.get('/menu-principal', routeMenuPrinc);

  /*routes almoxarifado*/
  app.get('/almoxarifado_cadastrarMaterial', routeAlmoxarifado);
  app.post('/cadastrar_material', routeAlmoxarifado);
  app.get('/almoxarifado_consultarMaterial', routeAlmoxarifado);
  app.post('/pesquisar_material', routeAlmoxarifado);
  app.get('/editar_material/:id', routeAlmoxarifado);
  app.put('/alterar_material/:id', routeAlmoxarifado);
  app.get('/excluir_material/:id', routeAlmoxarifado);
  /*** ***/
  app.get('/almoxarifado_cadastrarEntrada', routeAlmoxarifado);
  app.post('/pesquisar_materialEntrada', routeAlmoxarifado);
  app.post('/cadastrar_entrada/:id', routeAlmoxarifado);
  app.get('/almoxarifado_consultarEstoqueAtual', routeAlmoxarifado);
  app.get('/almoxarifado_cadastrarRequisicao', routeAlmoxarifado);
  app.post('/pesquisar_materialRequisicao', routeAlmoxarifado);
}



function initializeServer(app) {
  var server = http.createServer(app);
  server.listen(3000, function() {
  	 console.log("dsApp server running on http://localhost:3000");
  });	
}