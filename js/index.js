class Jogo {

    constructor () {
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

        let selecionadoX = []
        let selecionadoO = []
        let jogador= "X"
        let vitoriasX = 0
        let vitoriasO = 0
        let fimDeJogo = false

        window.addEventListener('load', this.addEventos)
    }

    addEventos () {
        iniciar.addEventListener('click', this.iniciarJogo)
        caixas.forEach(caixa => caixa.addEventListener('click', this.adicionarXouO))
    }

    iniciarJogo () {
        window.alert('O jogo foi iniciado')
    }

    adicionarXouO(e){
        let caixaSelecionada = e.target
        window.alert(caixaSelecionada)
    }
}

const jogo = new Jogo()
jogo.addEventos()