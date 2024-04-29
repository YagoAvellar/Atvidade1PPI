//Pediram para nós desenvolver uma aplicação web capaz de converter graus Celcius em Fahrenheit
import express from 'express'; //permite criar aplicações web de forma expressa;

//O ip 0.0.0.0 representa todas as placas de rede do computador que está executando essa aplicação
const host = '0.0.0.0'; 
//A porta identifica o programa  dentre tantos outros programas 
//que estão em execução no computador que esteja executando essa aplicação.
const porta = 3000; 


const app = express();

//requisição vem da Internet
//A resposta é enviada para a Internet para quem fez a requisição
function retornaPaginaInicial(requisicao, resposta){
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('<title>Página Inicial</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    resposta.write('<h1>Página Inicial</h1>');
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
};

function enviarDinheiro(requisicao, resposta){
    //extrair da url da requisição o valor desejado pelo usuário  
    let valorDesejado = requisicao.query.valor;
    if (!valorDesejado){
        valorDesejado = 0;
    }
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('<title>Oferta de Dinheiro</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    if (valorDesejado > 0){
        resposta.write('<h1>Toma aqui seus R$ ' + valorDesejado + '</h1>');
    }
    else{
        resposta.write('<h1>Informe o parâmetro valor na url:   http://localhost:3000/dinheiro?valor=100</h1>');
    }
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}

function converterCelsiusFahrenheit(requisicao, resposta){
    //extrair da url da requisição o(s) grau(s) celcius a ser convertido
    let grausCelsius = requisicao.query.grausCelsius;
    let sequencia    = requisicao.query.sequencia;
    if (!sequencia){
        sequencia = 1;
    }
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('<title>Conversor de graus Celsius para Fahrenheit</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    if (grausCelsius){
        sequencia = parseInt(sequencia);
        grausCelsius = parseInt(grausCelsius)
        for (let i =0; i < sequencia; i++){
            const resultado = (grausCelsius * (9/5)) + 32;
            resposta.write('<h1>' + grausCelsius + ' graus Celsius = ' + resultado + ' graus Fahrenheit</h1>');
            grausCelsius += 1;
        }
    }
    else{
        resposta.write('<h1>Informe o parâmetro grausCelsius na url:   http://localhost:3000/conversor?grausCelsius=0</h1>');
    }
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}
//Javascript, além de valores dos tipos: string, decimal, inteiro,booleano
//também permite que funções sejam passadas como parâmetros para outras funções.
app.get("/", retornaPaginaInicial);
app.get("/dinheiro", enviarDinheiro);
app.get("/conversor", converterCelsiusFahrenheit);
//( ) => {}  = função anônima conhecida como arrow function
app.listen(porta, host, () => {
    console.log("Servidor está executando em http://" + host + ":" + porta);
});
