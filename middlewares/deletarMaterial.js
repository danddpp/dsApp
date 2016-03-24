var Material = require('../models/almoxarifado/Material');

module.exports = function(req, res, next) {
   
   if(req.isAuthenticated()) {

     var id_material = req.params.id;
     console.log("here " + id_material);
    
     Material.findById(id_material).exec(function(err, material) {
    console.log(material.id +' '+ material.nome);    
        if(err) {
           return req.next(err);
        } else {
           material.remove(function(err) {
             if(err) { console.log(err); }
             else{
               next();
             }
           });  
        }
     });
   } else {
   	res.redirect('/');
   }

};