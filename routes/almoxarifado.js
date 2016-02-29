var router = require('express').Router();
var Material = require('.././models/almoxarifado/Material');

router.get('/almoxarifado_cadastrarMaterial', function(req, res) {
            if(req.isAuthenticated()) {
             var username = req.user.nome; 
             res.render('almoxarifado/material/cadastrarMaterial',
              { nome: username, mensagem: '' });
            } else {
              res.redirect('/');
            }    
});

router.post('/cadastrar_material', function(req, res) { 
    
    var query = {nome: req.body.material.nome};
        Material.findOne(query).select('nome').exec(function(err, material) {
             if(material) {
                  res.render('almoxarifado/material/cadastrarMaterial', 
                  	{nome: req.user.name, mensagem: 'material já existe no cadastro'});
             } else {
             	var novoMaterial = req.body.material;
             	Material.create(novoMaterial, function(err, novoMaterial) {
             	    if (err) { 
             	       res.redirect('/');
             	    } else {
             	      res.render('almoxarifado/material/cadastrarMaterial', 
             	      {nome: req.user.name, mensagem: 'material cadastrado com sucesso!'});
             	    }
             	});
             	
             }
        });
        
});


module.exports = router;
                   

		 

