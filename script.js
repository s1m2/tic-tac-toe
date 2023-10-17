const gameboard = document.querySelector('.gameboard');
const displayInfo = document.querySelector('.info');

const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [3,5,8],
  [0,4,8], [2,4,6]
];

let startingSymbol = 'X';

function restartGame () {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => { 
    cell.addEventListener('click', addSymbolToBoard);
    cell.textContent = '' 
  });
  displayInfo.textContent = '';
}

function checkWinner(cells) {
  let result;

  for(let combination of winningCombinations) {
    result = combination.every(cell => cells[cell].textContent === startingSymbol);
    if (result) break;
  }

  if (!result) startingSymbol = startingSymbol === 'X' ? 'O' : 'X';
  return result;
}

function checkScore () {
  const cells = document.querySelectorAll('.cell');
  const gameEnded = checkWinner(cells);

  if (gameEnded) {
    displayInfo.textContent = `${startingSymbol} has won the game`
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  } 
}

function addSymbolToBoard(e) {
  e.target.textContent = startingSymbol;
  e.target.removeEventListener('click', addSymbolToBoard);
  checkScore();
}

function createBoard () {
  const cells = new Array(9).fill('');

  cells.forEach((_cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.id = index;
    cellElement.className = 'cell';
    cellElement.addEventListener('click', addSymbolToBoard);
    gameboard.append(cellElement);
  });
}

document.addEventListener('DOMContentLoaded', createBoard);