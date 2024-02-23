import restartGame from "./restartButton.js";

const playerX = {
  name: '',
  moves: [],
  isMadeMove: false,
  status: 'in progres',
};

const playerO = {
  name: '',
  moves: [],
  isMadeMove: true,
  status: 'in progres',
};

const winningCombinations = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['0', '4', '8'],
  ['2', '4', '6']
];

function createGameField (gameField) {
  gameField.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    gameField.innerHTML += "<div class='cell' id=" + i + "></div>";
  }
}

function cellClick(e, player_1, player_2, winningCombinations, cells, functionListener, gameField) {
  if (player_1.isMadeMove === false && e.target.textContent !== 'X' && e.target.textContent !== 'O') {
    e.target.innerText = 'X';
    player_1.moves.push(e.target.id)
    player_1.isMadeMove = !player_1.isMadeMove;
    player_2.isMadeMove = !player_2.isMadeMove;
    console.log(player_1.moves.length);
    if (player_1.moves.length > 2) {
      console.log('как я сюда попал');
      checkWin(player_1, winningCombinations, cells, functionListener, gameField);
    }
  } else if (player_2.isMadeMove === false && e.target.textContent !== 'X' && e.target.textContent !== 'O') {
    e.target.innerText = 'O';
    player_2.moves.push(e.target.id)
    player_1.isMadeMove = !player_1.isMadeMove;
    player_2.isMadeMove = !player_2.isMadeMove;
    if (player_2.moves.length > 2) {
      checkWin(player_2, winningCombinations, cells, functionListener, gameField);
    }
  } else {
    alert('the cell is already occupied');
  }
}

function checkWin(player, winningCombinations, cells, functionListener, gameField) {
  const playerMoves = player.moves;
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (playerMoves.includes(a) && playerMoves.includes(b) && playerMoves.includes(c)) {
      player.status = 'Win';
      combination.map((el) => {
        const oneCell = cells[el];
        oneCell.style.cssText = "background-color: #02bbd5; transition: background-color 0.4s ease";
      });
      gameField.removeEventListener("click", functionListener);
      return true;
    }
  }
  return false;
}
const clickHandler = e  => {
  e.stopPropagation();
  e.target.className === "cell" 
  ? 
  cellClick(e, playerX, playerO, winningCombinations, cell, clickHandler, area)
  :
  alert("enter the empty cell");
}

const area = document.getElementById("area");
const cell = document.getElementsByClassName("cell");
const buttonRestart = document.querySelector(".restart-button");
buttonRestart.addEventListener("click", () => {
  restartGame(playerX, playerO, area, createGameField, clickHandler)
});


createGameField(area);




area.addEventListener("click", clickHandler);