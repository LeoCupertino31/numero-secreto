let listaDeNumerosSorteado = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //usa o codigo do responsive voice que esta dentro do html pra falar
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
      if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // ao inves de pegar pelo atributo butao, vai pegar o nome desse butao pelo id
      }  else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela ('p','O número é menor');
            } else {
                exibirTextoNaTela ('p','O número secreto é maior');
            }
            tentativas ++;
            limparCampo();

      }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteado.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteado = [];
    }

    if (listaDeNumerosSorteado.includes(numeroEscolhido)) { //se na lista ja tiver o numero escolhido
        return gerarNumeroAleatorio();// vai pedir pra gerar um numero aleatorio novamente caso ele ja esteja incluido na lista 
    } else {
        listaDeNumerosSorteado.push(numeroEscolhido); // vai inserir o numero escolhido dentro da lista
        console.log(listaDeNumerosSorteado);
        return numeroEscolhido;
    }
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; //vai deixar o campo chute do input vazio.
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio ();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
