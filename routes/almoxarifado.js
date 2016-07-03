var router = require('express').Router();
var Material = require('.././models/almoxarifado/Material');
var deletarMaterial = require('.././middlewares/deletarMaterial');
var cadastrarEntrada = require('.././middlewares/cadastrarEntrada');

/*cadastrarMaterial.ejs*/
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
  var username = req.user.nome;
    if(req.body.material.nome != '') {
    
     var query = {nome: req.body.material.nome};

        Material.findOne(query).select('nome').exec(function(err, material) {
             if(material) {
                  res.render('almoxarifado/material/cadastrarMaterial', 
                  	{nome: username, mensagem: 'material já existe no cadastro'});
             } else {
             	
              var material = req.body.material;

              var novoMaterial = new Material({
                  nome: material.nome,
                  unidade: material.unidade,
                  estoque_min: material.estoque_min,
                  estoque_atual: 0,
                  status: material.status,
                  observacao: material.observacao,
                  entradas: [],
                  saidas:   []
              });

             	//verificar se novoMaterial não está vazio
             	Material.create(novoMaterial, function(err, novoMaterial) {
             	    if (err) {
             	       //implementar redirecionamento para pagina de erro aqui 
             	       return req.next(err);
             	    } else {
             	      res.render('almoxarifado/material/cadastrarMaterial', 
             	      {nome: username, mensagem: 'material cadastrado com sucesso!'});
             	    }
             	});
             	
             }
        });
    } else {
        res.render('almoxarifado/material/cadastrarMaterial', 
        {nome: username, mensagem: 'nome do material não foi especificado!'});
    }
});
/*cadastrarMaterial.ejs*/



/*consultarMaterial.ejs*/
router.get('/almoxarifado_consultarMaterial', function(req, res) {
        if(req.isAuthenticated()) {
          var username = req.user.nome;
          Material.find(function(err, materiais) {
              if(err) {
                return req.next(err);
               //implementar redirecionamento para pagina de erro aqui 
               res.redirect('/');
              } else {
              	res.render('almoxarifado/material/consultarMaterial', 
              		             { nome: username, materiais: materiais,
              		             mensagem: '' });
              }
          });

        } else {
        	res.redirect('/');
        }
});

router.post('/pesquisar_material', function(req, res) { 
      var username = req.user.nome;
      if(req.body.material.nome) {

      	var query = {nome: req.body.material.nome};
        Material.findOne(query).exec(function(err, materiais) {
          
             if(err) {
                return req.next(err);      
             } 

             else if (!materiais) {
                res.render('almoxarifado/material/consultarMaterial', 
                { nome: username, materiais: null, mensagem: 'material não encontrado!' });
             }

             else {
             	var material = [materiais];
                res.render('almoxarifado/material/consultarMaterial', 
                { nome: username, materiais: material, mensagem: '' });
             }

        });

    } else {
      
      Material.find(function(err, materiais) {
          if(err) {
            return req.next(err);
           //implementar redirecionamento para pagina de erro aqui 
           res.redirect('/');
          } else {
          	res.render('almoxarifado/material/consultarMaterial', 
          		             { nome: username, 
          		               materiais: materiais,
          		               mensagem: '' });
          }
      });      	
    }

});
/*consultarMaterial.ejs*/

/*editarMaterial.ejs*/
router.get('/editar_material/:id', function(req, res) {
    var material_id = req.params.id;
    var username = req.user.nome;
    
    if(req.isAuthenticated) {
       Material.findById(material_id).exec(function(err, material) {
           if(err) {
              return req.next(err);
           } else {
              console.log(material);
              //console.log(material.nome);
              res.render('almoxarifado/material/alterarMaterial', 
                           { nome: username, 
                             material: material,
                             mensagem: '' });
           }
       });
    }

    else {
      res.redirect('/');
    }
});
/*editarMaterial.ejs*/


/*atualizarMaterial.ejs*/
router.put('/alterar_material/:id', function(req, res) {
    
    if(req.isAuthenticated) {
      var material_id = req.params.id;
      var username = req.user.nome;

       Material.findById(material_id).exec(function(err, material) {
           if(err) {
              return req.next(err);
           } else {
              //console.log(material);
              //console.log(material.
              
              if(req.body.material.nome != '') {

                material.nome = req.body.material.nome;
                material.unidade = req.body.material.unidade;
                material.estoque_min = req.body.material.estoque_min;
                material.status = req.body.material.status;
                material.observacao = req.body.material.observacao;
               
                material.save(function() {
                 res.render('almoxarifado/material/alterarMaterial', 
                  {
                   nome: username, 
                   material: material,
                   mensagem: 'Material Atualizado com sucesso!' 
                  });
                });

              } else {
                res.render('almoxarifado/material/alterarMaterial', 
                 {
                  nome: username, 
                  material: material,
                  mensagem: 'nome do material não foi especificado!' 
                 });
              }

           }
       });
    }

    else {
      res.redirect('/');
    }
});
/*atualizarMaterial.ejs*/

/*excluirMaterial.ejs*/
router.get('/excluir_material/:id', deletarMaterial, function(req, res) {
    if(req.isAuthenticated()) {
     var username = req.user.nome;
     Material.find(function(err, materiais) {
         if(err) {
           return req.next(err);
          //implementar redirecionamento para pagina de erro aqui 
          res.redirect('/');
         } else {
          res.render('almoxarifado/material/consultarMaterial', 
                         { nome: username, 
                           materiais: materiais,
                           mensagem: '' });
         }
     });   
    } else {
      res.redirect('/');
    }
});
/*excluirMaterial.ejs*/



/*cadastrarEntrada.ejs*/
router.get('/almoxarifado_cadastrarEntrada', function(req, res) {
       if(req.isAuthenticated()) {
         var username = req.user.nome; 
         res.render('almoxarifado/material/cadastrarEntrada',
         { nome: username,
           materiais: null,
           mensagem: '' });
       } else {
         res.redirect('/');
       }
});

router.post('/pesquisar_materialEntrada', function(req, res) { 
      var username = req.user.nome;

      //se houver valor no campo de pesquisa
      if(req.body.material.nome) {

        var query = {nome: req.body.material.nome};
        Material.findOne(query).exec(function(err, materiais) {
          
             if(err) {
                return req.next(err);      
             } 

             else if (!materiais) {
                res.render('almoxarifado/material/cadastrarEntrada', 
                { nome: username, materiais: null, mensagem: 'material não encontrado!' });
             }

             else {
              var material = [materiais];
                res.render('almoxarifado/material/cadastrarEntrada', 
                { nome: username, materiais: material, mensagem: '' });
             }

        });

    } else {
            res.render('almoxarifado/material/cadastrarEntrada', 
                           { nome: username, 
                             materiais: null,
                             mensagem: 'Insira um nome de material para a pesquisa.' });        
    }

});

router.post('/cadastrar_entrada/:id', function(req, res) {
    if(req.isAuthenticated()) {
     
     var id_material = req.params.id;
        
     Material.findById(id_material).exec(function(err, material) {
        
        if (err) { return req.next(err); }
        
        else {

        var entrada = req.body.entrada;
        
        if (entrada.dataEntrada != "" &&
            entrada.num_nf != "" &&
            entrada.dataEmissaoNf != "" &&
            entrada.fornecedor != "" &&
            entrada.qtde != "") {
          
              material.entradas.push(entrada);
              var atual = Number(material.estoque_atual);
              var novo = Number(entrada.qtde);
              material.estoque_atual = atual + novo;  
          
          var username = req.user.nome;
          material.save(function() {
            res.render('almoxarifado/material/cadastrarEntrada', 
                     { nome: username, materiais: null,
            mensagem: 'Entrada cadastrada com sucesso.' });        

          });
        }

        else
           res.render('almoxarifado/material/cadastrarEntrada', 
                    { nome: username, materiais: null,
           mensagem: 'Entrada inválida.' });
        }
     });
   
   } else {
    res.redirect('/');
   }
}); 


/*cadastrarEntrada.ejs*/


/*consultarEstoqueAtual*/
router.get('/almoxarifado_consultarEstoqueAtual', function(req, res) {
   if(req.isAuthenticated()) {
      var username = req.user.nome;
      Material.find(function(err, materiais) {
          if(err) {
            return req.next(err);
           //implementar redirecionamento para pagina de erro aqui 
           res.redirect('/');
          } else {
            
            

            res.render('almoxarifado/material/consultarEstoqueAtual', 
                      { nome: username, materiais: materiais });
          }
      });
   } else {
     res.redirect('/');
   }      
});
/*consultarEstoqueAtual*/

/*cadastrarRequisição*/
router.get('/almoxarifado_cadastrarRequisicao', function(req, res) {
     if(req.isAuthenticated()) {
        var username = req.user.nome;
        res.render('almoxarifado/requisicoes/cadastrarRequisicao', 
                      { nome: username, 
                        materiais: null,
                        mensagem: null  });
     } else {
      res.redirect('/');
     }
});
/*cadastrarRequisição*/



router.post('/pesquisar_materialRequisicao', function(req, res) { 
      var username = req.user.nome;
      if(req.body.material.nome) {

        var query = {nome: req.body.material.nome};
        Material.findOne(query).exec(function(err, materiais) {
          
             if(err) {
                return req.next(err);      
             } 

             else if (!materiais) {
                res.render('almoxarifado/requisicoes/cadastrarRequisicao', 
                { nome: username, materiais: null, mensagem: 'material não encontrado!' });
             }

             else {
              var material = [materiais];
                res.render('almoxarifado/requisicoes/cadastrarRequisicao', 
                { nome: username, materiais: material, mensagem: '' });
             }

        });

    } else {
      
      Material.find(function(err, materiais) {
          if(err) {
            return req.next(err);
           //implementar redirecionamento para pagina de erro aqui 
           res.redirect('/');
          } else {
            res.render('almoxarifado/material/cadastrarRequisicao', 
                           { nome: username, 
                             materiais: materiais,
                             mensagem: '' });
          }
      });       
    }

});




module.exports = router;
                   

		 

