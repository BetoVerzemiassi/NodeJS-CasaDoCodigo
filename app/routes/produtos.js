module.exports = function(app){
    //Mapeando rota
    app.get('/produtos', function(req,res,next){        
        //Inicializando a conexão com o Banco de Dados 
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection); 
        produtosDAO.lista(function(erros,resultados){
            if(erros){
                return next(erros);
            }
            res.format({
                html: function(){
                    res.render('produtos/lista',{lista:resultados});
                },
                json: function(){
                    res.json(resultados);
                }
            });            
       });
       //Finaliza a conexão
       connection.end();
    }); 

    //Mapeando rota GET = Busca algo
    app.get('/produtos/form', function(req,res){
        res.render('produtos/form',{
            errosValidacao: {},
            produto: {}
        });
    });

    //POST = Retorna algo
    app.post('/produtos', function(req,res){

        var produto = req.body;
        
        //Validando dados
        req.assert('titulo','Titulo é obrigatório').notEmpty();//Verifica de fato se o campo está vazio
        req.assert('preco','Formato inválido').isFloat();

        //retorna a lista com todos os possíveis erros, lista armazenada na variável erros
        var erros = req.validationErrors();

        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('produtos/form',{errosValidacao:erros, produto:produto});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });   
           
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);  
        produtosDAO.salva(produto,function(erros,resultados){
            res.redirect('/produtos');
        }); 
    });
}      