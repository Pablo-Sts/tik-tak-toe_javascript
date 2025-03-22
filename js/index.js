const caixas = document.querySelectorAll('.caixa img')

const jogadorAtual = document.querySelector('.jogadorAtual img')

const placar = document.querySelector('.placar')

const iniciar = document.querySelector('.iniciar')

const reiniciar = document.querySelector('.reiniciar')

const mensagemFimDeJogo = document.querySelector('.mensagemFimDeJogo p')

const condicoesVitoria = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const caixaLivre  = document.querySelector('.caixa img').src.toString()

let selecionadoX = []
let selecionadoO = []
let jogador= "X"
let vitoriasX = 0
let vitoriasO = 0
let fimDeJogo = false

let vencedor 
let venceu
let quantidadeDeRodadas 

iniciar.addEventListener('click', () => iniciarJogo())

reiniciar.addEventListener('click',() => reiniciarJogo())

function iniciarJogo() {

    selecionadoO = []
    selecionadoX = []
    jogador = 'X'
    fimDeJogo = false

    if (iniciar.style.display != 'none') {
        iniciarElementosDoJogo()
    }
    reiniciarCaixas()

    atualizarPlacar()

    atualizaJogadorAtual()
    
    atualizarTabuleiro()
}

function reiniciarJogo () {
    vitoriasO = 0
    vitoriasX = 0
    iniciarJogo()
}

function atualizarTabuleiro() {
    if (jogadaValida()) {
        jogada()
    }else {
        setTimeout(() => {
            iniciarJogo()
        }, 2500);
        atualizarPlacar()
        atualizMensagemFimDeJogo()
    }
}

function jogada () {
    caixas.forEach((caixa, i) => caixa.addEventListener('click', clique = () => {
        if (caixaVazia(caixa) && !fimDeJogo) {
            caixa.setAttribute('src', `imagens/${jogador}.png`)
            caixa.style.opacity = '1'
            adicionarSelecionado(jogador, i)
            if (quantidadeDeRodadas >3) {
                checarVencendor(jogador)
            }
            if (!fimDeJogo) {
                trocarJogador()
            }
            atualizaJogadorAtual()
            atualizarTabuleiro() 
        }
    }))   
}

function jogadaValida () {
    quantidadeDeRodadas = selecionadoO.length + selecionadoX.length
    if (!fimDeJogo && quantidadeDeRodadas <9) {
        return true
    }
    return false
}

function trocarJogador () {
    jogador = jogador === 'X' ? 'O':'X'
}

function atualizaJogadorAtual() {
    jogadorAtual.setAttribute('src', `imagens/${jogador}.png`)
}

function caixaVazia (caixa) {
    if (caixa.src.toString() === caixaLivre) {
        return true
    }
    return false
}

function reiniciarCaixas () {
    caixas.forEach(caixa => caixa.style.opacity = '0')
    caixas.forEach(caixa => {
        caixa.setAttribute("src", "")
    })
}

function adicionarSelecionado (jogador, i) {
    if (jogador === 'X') {
        selecionadoX.push(i)
    } else {
        selecionadoO.push(i)
    }
}

function checarVencendor (jogador) {
    if (jogador === 'X') {
        checaVitoria(selecionadoX)
        if (fimDeJogo) {
            vencedor = jogador
            vitoriasX++
        }
    } else {
        checaVitoria(selecionadoO)
        if (fimDeJogo) {
            vencedor = jogador
            vitoriasO++
        }
    }
}

function checaVitoria (selecionado) {
    return condicoesVitoria.forEach(condicaoVitoria => {
    venceu = condicaoVitoria.filter(item => selecionado.includes(item)).length == 3
    if (venceu) {
        fimDeJogo = true
    }
    } )
} 

function atualizarPlacar() {
    placar.innerHTML = `PLACAR: X  ${vitoriasX} : ${vitoriasO} O`
}

function atualizMensagemFimDeJogo() {
    if (fimDeJogo) {
        mensagemFimDeJogo.innerHTML = `O vencendor foi o jogador ${jogador}! Limpando Tabuleiro...`
    } else {
        mensagemFimDeJogo.innerHTML = 'A rodada terminou em empate! Limpando Tabuleiro...'
    }
    setTimeout(() => {
        mensagemFimDeJogo.innerHTML = ''
    }, 2500)
}

function iniciarElementosDoJogo () {
    iniciar.style.display = 'none'
    reiniciar.style.display = 'inline-block'
    jogadorAtual.style.display = 'inline-block'
}