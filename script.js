// Declarações de Variáveis
let n1 = '',
  n2 = '',
  operador = '',
  turnN2 = false,
  posResult = false,
  sinalTrocado = false

// Elementos DOM
const telaAux = document.querySelector('#telaAux')
const tela = document.querySelector('#tela')

// Funções reutilizáveis dentro de outras
const dividir = () => n1 / n2
const multiplicar = () => n1 * n2
const subtrair = () => n1 - n2
const somar = () => Number(n1) + Number(n2)

const conferirVez = () => {
  if (n1 != '') {
    turnN2 = true
  }
}

// Altera o valor da fonte para se adaptar melhor ao numero de caracteres
const ajusteFonte = () => {
  if (telaAux.value.length > 16) {
    telaAux.style.fontSize = '0.8rem'
  } else {
    telaAux.style.fontSize = '1.7rem'
  }

  if (tela.value.length > 16) {
    tela.style.fontSize = '1.4rem'
  } else {
    tela.style.fontSize = '1.7rem'
  }
}

// Reseta as variaveis apos o botao de = ser ativado
const posResultado = () => {
  posResult = true
  n1 = ''
  n2 = ''
  turnN2 = false
  operador = ''
  sinalTrocado = false
}

// Funções acionados por botões no HTML
// Botao backspace
function limpaUltimo() {
  if (posResult == false) {
    tela.value = tela.value.substring(0, tela.value.length - 1)
    telaAux.value = telaAux.value.substring(0, telaAux.value.length - 1)
  }
}

// Botao C
function limpaTudo() {
  tela.value = ''
  telaAux.value = ''
  n1 = ''
  n2 = ''
  operador = ''
  turnN2 = false
  posResult = false
  sinalTrocado = false
}

// Botao de +-
function trocaSinal() {
  if (posResult == false) {
    if (sinalTrocado == false) {
      tela.value = `-${tela.value}`
      telaAux.value = `${n1}${operador}${tela.value}`
    }
    if (sinalTrocado == true) {
      tela.value = tela.value.substring(1, tela.value.length)
      telaAux.value = `${n1}${operador}${tela.value}`
    }
    sinalTrocado = !sinalTrocado
    console.log(sinalTrocado)
  }
}

// Botao de = 
function calcular() {
  if (n1 != '' || n1 == 0) {
    if (posResult == false) {
      n2 = tela.value

      if (n2 != '') {
        telaAux.value = `${n1}${operador}${n2}`

        if (operador == '/') {
          tela.value = dividir()
        }
        if (operador == '*') {
          tela.value = multiplicar()
        }
        if (operador == '-') {
          tela.value = subtrair()
        }
        if (operador == '+') {
          tela.value = somar()
        }
        turnN2 = false
        ajusteFonte()
        posResultado()
      } else {
        alert('Adicione ao menos um número')
      }
    }
  }
}

// Botoes de números
function inserirNum(num) {
  if (posResult == true) {
    tela.value = num
    telaAux.value = num
    posResult = false
  } else {
    if (tela.value.length >= 16) {
      alert('Limite de dígitos alcançado')
    } else {
      tela.value += num
      telaAux.value += num

      if (operador == '/' && num == 0) {
        alert('Impossível dividir por 0')
        limpaTudo()
      }

      ajusteFonte()
    }
  }
}

// Botoes de operadores
function operacao(op) {
  if ((turnN2 == true && tela.value != '') || posResult == true) {
  } else {
    operador = op
    sinalTrocado = false

    if (turnN2 == false) {
      n1 = tela.value
    }

    tela.value = ''

    if (n1 != '') {
      telaAux.value = `${n1}${op}${n2}`
    } else {
      n1 = 0
      telaAux.value = `${n1}${op}${n2}`
    }
    conferirVez()
  }
}

// Botao de ponto 
function pontoFlutuante() {
  if (posResult == false) {
    if (tela.value.indexOf('.') == -1) {
      tela.value += '.'
      telaAux.value += '.'

      if (tela.value.charAt(0) == '.') {
        if (turnN2 == false) {
          telaAux.value = '0.'
        } else {
          telaAux.value = `${n1}${operador}0${tela.value}`
        }
        tela.value = '0.'
      }
    }
  }
}
