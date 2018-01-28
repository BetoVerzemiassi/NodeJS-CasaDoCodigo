var mysql = require('mysql');

/*Criamos para evitar que o load invoque a função automaticamente sem 
que a gente chame de fato*/
var connectMYSQL = function(){

    //Nada definido, estamos no ambiente DEV
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs'
        });        
    }

    //Estamos no ambiente de Test
    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs_test'
        }); 
    } 
};

//wrapper - Função que embrulha outra função
module.exports = function(){
    return connectMYSQL;
}