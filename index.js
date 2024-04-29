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
function calcularTabuada(requisicao, resposta) {
    // Extrair da URL da requisição o número para o qual a tabuada será calculada
    let numero = requisicao.query.numero;
    let sequencia = requisicao.query.sequencia;
    
    // Verificar se foi fornecido um parâmetro sequência e definir para 10 se não houver
    if (!sequencia) {
        sequencia = 10;
    }
    
    // Escrever a estrutura básica do HTML na resposta
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('<title>Tabuada</title>');
    resposta.write('</head>');
    resposta.write('<body>');
    
    // Verificar se um número foi fornecido na URL
    if (numero) {
        // Converter o número fornecido para um valor inteiro
        numero = parseInt(numero);
        
        // Converter a sequência fornecida para um valor inteiro
        sequencia = parseInt(sequencia);
        
        // Calcular e exibir a tabuada do número fornecido
        for (let i = 1; i <= sequencia; i++) {
            const resultado = numero * i;
            resposta.write('<h1>' + numero + ' x ' + i + ' = ' + resultado + '</h1>');
        }
    } else {
        // Se nenhum número foi fornecido na URL, exibir uma mensagem solicitando que um número seja fornecido
        resposta.write('<h1>Informe o parâmetro numero na URL: http://localhost:3000/tabuada?numero=</h1>');
    }
    
    // Fechar a estrutura HTML na resposta
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
}

app.get("/", retornaPaginaInicial);
app.get("/conversor", converterCelsiusFahrenheit);
app.get("/tabuada", calcularTabuada);
app.listen(porta, host, () => {
    console.log("Servidor está executando em http://" + host + ":" + porta);
});