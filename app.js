let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoNaTela('h1','Jogo do numero secreto');
    exibirTextoNaTela('p','Escolha um numero de 1 a 100');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value 
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1','Você acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('p' , mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p','O numero secreto é menor');
        } else {
            exibirTextoNaTela ('p','O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    } 
}
function gerarNumeroAleatorio() {
   let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
   let quantidadeDeElemtosNaLista = listaDeNumerosSorteados.length
   if(quantidadeDeElemtosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   }else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido
   }
}   

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}