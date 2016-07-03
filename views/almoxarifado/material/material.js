

app.controller("MaterialCtrl", function($scope) {
   //qdo o usuario clica em saidas-> requisição deverá
   //ser trazido do banco apenas os materiais com qtde
   //maior que 0

    $scope.addOnReq = function(item) {
        
        //trazer item p obj angular e verificar se qtde do 
        //item está disponível

        //se sim, trazer item, deduzir estoque e verificar se já existe
        //o item no carrinho. Caso exista incrementar qtde

        //se for um novo item, add ao carrinho e deduzir estoque
        
    }
});