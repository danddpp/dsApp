var Material = require('../.././models/almoxarifado/Material');
var app = angular.module('ModuleMaterial', []);

app.controller("requisicaoCtrl", function($scope) {
   
   $scope.teste = 'huahua';


   $scope.listaMaterial = [];
   
   $scope.incluirMaterial = function(material) {
     var query = {nome: material.nome};

      Material.findOne(query).select('nome').exec(function(err, material) {
         	     
      });
   };

});



