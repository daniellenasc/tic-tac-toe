const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let circleTurn; //para definir a vez do jogador: se a variável for verdadeira, é a vez do O, se for falsa, é a vez do X
const xClass = 'x';
const circleClass = 'circle';
const winningMessageTextElement = document.querySelector('[data-winning-message-text');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

const placarX = document.getElementById("pontoX");
const placarO = document.getElementById("pontoO");
let pontosX = 0;
let pontosO = 0;




startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
  swapTurns() 
  //para que cada cell só possa ser clicada uma única vez
  cellElements.forEach(cell => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once : true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick (event) {
  const cell = event.target //célula clicada
  const currentClass = circleTurn ? circleClass : xClass //definir de qual jogador é a vez

  //definir a cell que será clicada
  placeMark(cell, currentClass)

  //checar vitória
  if (checkWin(currentClass)){
    endGame(false)
  } else if (isDraw()) {
    endGame (true)
  } else {
    swapTurns()
    setBoardHoverClass()
  } 
}


//função para definir qual cell será clicada 
function placeMark(cell, currentClass){
  cell.classList.add(currentClass)
}

//função para trocar a vez de cada jogadar
function swapTurns() {
  circleTurn = !circleTurn
}

//função para adicionar os marcadores 
function setBoardHoverClass(){
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  if (circleTurn){
    board.classList.add(circleClass);    
  } else {
    board.classList.add(xClass); 
  }
}

//função para checar se houve vitória - passar pelas combinações de vitória para saber se as três cells estão com a mesma classe X ou O
function checkWin(currentClass){
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    })
  })

}

//função para checar se houve empate - verificar se todas as cells estão preenchidas (transformar o cellElements em uma array com o spread)
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}

//função para adicionar a mensagem de vitória ou empate e o respectivo ponto no placar
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else if (circleTurn){
    winningMessageTextElement.innerText = "O's wins!";
    pontosO += 1;
    placarO.innerText = `${pontosO}`;
  } else {
    winningMessageTextElement.innerText = "X's wins!";
    pontosX += 1;
    placarX.innerText = `${pontosX}`;
  }
  winningMessageElement.classList.add('show');
}