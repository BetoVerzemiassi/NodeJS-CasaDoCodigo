/*Utilizando umas das bibliotecas disponíveis do Node.js criamos o servidor que é capas de escutar as solicitações do cliente localhost:3000

- require() - é uma funçao dentro do Node.js que importa tudo o que necessitamos.

- Invocamos um método a partir da variável http cujo nome é createServer(), que criará o servidor.

- listen() - Informamos exatamente a porta que queremos escutar, no caso,  a 3000 que preenchemos nos parênteses.

- Precisamos passar como parâmetro para função createServer(), uma função anônima que recebe dois parâmetros, um de requisição e um de resposta.

- Dentro da função anônima, podemos mandar uma resposta usando res.end()

- O IF, Verificamos se a requisição foi feita para url, se for verdadeiro mostra a mensagem "listando produtos da loja". Caso contrário, mostra a mensagem "Home da Cada do Código"

- Vamos utilizar o Express, biblioteca JavaScript construída sobre o módulo HTTP do Node.js, e nos fornece uma maneira mais simples de lidar com as requisições.
*/

var http = require('http');

http.createServer(function(req, res){
    if(req.url == "/produtos"){
        res.end("<html><body><h1>Listando os produtos</h1></body></html>");
    }else{
        res.end("<html><body>Home da Casa do Codigo</body></html>");
    }    
}).listen(3000);

console.log("Servidor ta Rodando");