const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('winningMessage');
let winningMessageText = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
let circleTurn;



startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach( cell =>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });

    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
};

function handleClick(e){
    //add the suitable class list to the cell
    const cell = e.target;
    const currentClass = circleTurn? CIRCLE_CLASS: X_CLASS;
    placeMark(cell, currentClass);

    //handle the result of the click
    if(checkWin(currentClass)){
        //it is not a draw
        endGame(false);
    }else if(isDraw()){
        //it is a draw
        endGame(true);
    }else{
        //the game has not finished yet
        swapTurns();
        setBoardHoverClass();
    }


}

function setBoardHoverClass(){
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if(circleTurn){
      board.classList.add(CIRCLE_CLASS);
  }
  else{
      board.classList.add(X_CLASS);
  }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}


function checkWin(currentClass){
      return WINNING_COMBINATIONS.some(combination =>{
       return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessageText.innerText = 'It\'s a tie!';
    }else{
        winningMessageText.innerText = `${circleTurn? "O's": "X's"} won!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
   return [...cellElements].every(cell =>{
       return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
   })
}

function swapTurns(){
    circleTurn = !circleTurn;
}