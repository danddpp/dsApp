var express = require('express');
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
  app.get('/almoxarifado_cadastrarMaterial', routeAlmoxarifado);
  app.post('/cadastrar_material', routeAlmoxarifado);
}



function initializeServer(app) {
  app.listen(3000, function() {
  	 console.log('Server on in localhost:3000');
  });	
}