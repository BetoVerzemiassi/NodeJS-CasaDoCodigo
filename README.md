**Anotações**

* express espera uma string cujo nome é 'view engine'
* set() - usado para definir variáveis para dentro do Express, que passem por todo o sistema.

* app - variável que guarda o objeto do Express
* send() - envia um retorno direto para o cliente
* render() - caminho das páginas que ele vai renderizar
* instalação do Nodemon - é um projeto javascript que monitora as mudanças e reinicia o Node.js.
* npm install -g nodemon - rodar npm start
* O nodemon é uma ferramenta que fica observando o código do projeto e já faz o reload automático sempre que detecta alguma alteração.


* CommonJS - padrão de carregamento de módulos javascript. Exige que seja disponibilizado a variável **module**. 
Podemos chamar o atributo **exports** e atribuir a função que queremos retornar.

* CommonJS - é uma convenção para carregamentos de módulos javascript em aplicações server-side. 
O objeto que o node disponibiliza é o **module** e a função é passada para o atributo **exports** desse objeto

* Rotas são as configurações que criamos para cada url específica que queremos atender no nosso sistema
server-side implementado em javascript.

**Consultando o Banco de Dados**

* Driver implementado em JavaScript e que funciona no Node.js justamente para não nos preocuparmos. `npm install mysql --save`

**Isolando a criação da conexão com o banco de dados**

* Reorganizamos o código. Lembrando que JavaScript é uma linguagem muito rica, podemos guardar em uma variável um valor qualquer ou uma função.

* Ao criar um método cuja unica função é isolar um objeto que a criação é um pouco mais difícil, nós estamos usando um design pattern que é chamado de **FACTORY METHOD**. Por isso é interessante renomear o `dbConnection.js` como `connectionFactory.js`. E no produtos.js nós iremos importar, em vez de **('../infra/dbConnection') o ('../infra/connectionFactory'**.

```
var dbConnection = require('../infra/connectionFactory');
```

* Factory é um padrão de desenvolvimento muito utilizado no mundo Orientado a Objetos quando queremos isolar a criação de um objeto complexo para que os outros objetos que o utilizam passem apenas a pedir a sua criação sem necessariamente saber como ele está sendo construído. Por isso, a classe responsável por fazer essa criação fica conhecida como Fábrica, ou Factory, pois ela tem a função de fabricar o objeto desejado.

**Carregamento automático dos módulos**

* Existe uma biblioteca que foi criada a partir dos desenvolvedores do **Express** é a **Express Load** e ela realiza o carregamento 
automático das rotas. Digitamos no Terminal `npm install express-load --save` para instalar.

**Evitando o this descontextualizado**

* new = Criar um novo contexto de uso para a estrutura que está no arquivo `produtosBanco.js`

* Portanto, quando estivermos usando o `this` dentro de uma função não sabemos exatamente quem vai ser esse `this`.

* Portanto, o programador que estiver desenvolvendo tem que saber que deve ser usado `new`.

* Content Negotiation = É um mecanismo definido no `HTTP` que torna possível servir diferentes formatos de um mesmo 
conteúdo a partir da mesma url. Evitando assim que se precisasse criar novas `urls` para cada formato necessário 
para exibir a lista de produtos.


**O que é e como funciona o module.exports ?**

* Existe uma função interna do `Node.js` que recebe um `path` do módulo a ser carregado.

* Essa função procura pelo local do módulo de acordo com o formato do `path`

* Para conseguir carregar a função do módulo, ele cria uma função com um nome do tipo `funcaoDeCarregamento` ou algo assim, que recebe uma 
função anônima e dentro dessa função, invoca a função `eval()` do JavaScript passando como parâmetro o que foi carregado do módulo a partir 
do `path` recebido.

* Para que ele fique visível de fora, é disponibilizado um objeto chamado `module` ou algo do tipo, que contém um objeto `exports` onde ficam armazenados todos os paths passados.

* Por fim a `funcaoDeCarregamento` é invocada recebendo como parâmetro os próprios objetos `module e module.exports` e é retornado o objeto module.

* Essa é a maneira escolhida pelo `Node.js` para fazer carregamento dinâmico de módulos JavaScript. Outros frameworks podem fazer de formas diferentes.

* Uma convenção que ajuda a padronizar essa estratégia é a CommonJS, que como já vimos, define várias Especificações para código JavaScript.


**Porque utilizar os callbacks ?**

* Quando uma função é invocada dentro da arquitetura `Node.js` o que acontece é que o fluxo do código não fica parado esperando o retorno dessa função.

* Fala-se que as chamadas das funções são assíncronas ou não-blocantes, ou seja a chamada é feita e logo em seguida o processador já fica liberado para 
atender a novas chamadas.

* Quem fica responsável por orquestrar esse escalonamento do processo é o próprio Sistema Operacional.

* Por esse motivo é que o `Node.js` é muito útil para as aplicações que dependem de muitas operações de `I/O` (Input/Output - Entra/Saída) em que existem 
várias chamadas a procedimentos que não necessariamente de lógica da aplicação, mas sim de consultas externas ou ações de infra-estrutura, como a leitura 
e escrita em um banco de dados.

**Instalando o Mocha e executando testes**

* Existem ferramentas que possibilitama automatização dos teste, portanto, para implementar uma nova maneira de realizar testes, nós vamos implementar 
uma biblioteca, a `mocha`. 

```
npm install mocha --save dev
```

* Além de instalar, nós pedimos para que isso seja salvo e marcamos a biblioteca para estar disponível apenas no ambiente de desenvolvimento. 

* Para realizar testes será preciso utilizar um script, o `mocha`. Claro que se rodarmos isso agora, não encontraremos nada. Então, vamos retornar 
ao projeto e criar a pasta `test` na raiz do projeto, isso é uma convenção necessária para utilizar a biblioteca, e nela nós criamos o arquivo 
produtos.js.

* Agora, chega o momento de começar a criar os testes. Nesse arquivo não é preciso nem adicionar o `require()`, pois ele faz isso automaticamente. 
Como queremos que o teste seja feito em relação ao produtosController e queremos saber: - se a lista está retornando um json; - se o cadastro aceita json; - se o cadastro aceita urlencoded;

* Portanto, pensando nesses aspectos, percebemos que trata-se de um cenário macro. Para fazer isso o mocha fornece a função `describe()`. Passamos para a função o cenário que desejamos testar, no caso, o ProdutosController, e como é de praxe, temos que passar uma função e dentro dela deve constar todos os casos de teste.

```
describe('ProdutosController', function(){

});
```

* Vamos começar testando a lista em JSON. Vamos usar um função `it()` que recebe um nome para o teste listagem json e uma função como argumento. Dentro da função anônima, vamos colocar um console.log().

```
describe('ProdutosController', function(){
    it('listagem json', function(){
        console.log("teste de verificacao de listagem json");
    });
});
```

* Nesse momento temos o `ProdutosController` e o teste de verificação de listagem. Uma outra convenção é utilizar o símbolo da "cerquilha" (#) para marcar melhor qual parte do describe que nós estamos vendo. Nosso código está da seguinte maneira:

```
describe('#ProdutosController', function(){
    it('#listagem json',function(){
        console.log("teste de verificacao de listagem json");
    });

});
```