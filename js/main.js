const area = document.getElementById("area");

for (let i = 0; i < 9; i++) {
  area.innerHTML += "<div class='cell' id=" + i + "></div>";
}
const cell = document.getElementsByClassName("cell");

const playerX = {
  name: '',
  moves: [],
  winCombination: [],
  isMadeMove: false,
  status: 'in progres',
};

const playerO = {
  name: '',
  moves: [],
  winCombination: [],
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

const clickHandler = e  => {
  e.stopPropagation();
  e.target.className === "cell" 
  ? 
    cellClick(e, playerX, playerO, winningCombinations, cell, area)
  :
    alert("enter the empty cell");
}

area.addEventListener("click", clickHandler);


function cellClick(e, player_1, player_2, winningCombinations, cells, fieldListener) {
  if (player_1.isMadeMove === false && e.target.textContent !== 'X' && e.target.textContent !== 'O') {
    e.target.innerText = 'X';
    player_1.moves.push(e.target.id)
    player_1.isMadeMove = !player_1.isMadeMove;
    player_2.isMadeMove = !player_2.isMadeMove;
    console.log(player_1.moves.length);
    if (player_1.moves.length > 2) {
      console.log('как я сюда попал');
      checkWin(player_1, winningCombinations, cells, fieldListener);
    }
  } else if (player_2.isMadeMove === false && e.target.textContent !== 'X' && e.target.textContent !== 'O') {
    e.target.innerText = 'O';
    player_2.moves.push(e.target.id)
    player_1.isMadeMove = !player_1.isMadeMove;
    player_2.isMadeMove = !player_2.isMadeMove;
    if (player_2.moves.length > 2) {
      checkWin(player_2, winningCombinations, cells, fieldListener);
    }
  } else {
    alert('the cell is already occupied');
    console.log('X: ', player_1);
    console.log('O: ', player_2);
    console.log('textCOntent', e.target.textContent);
  }
}

function checkWin(player, winningCombinations, cells, fieldListener) {
  const playerMoves = player.moves;
  for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      console.log(playerMoves);
      if (playerMoves.includes(a) && playerMoves.includes(b) && playerMoves.includes(c)) {
        player.status = 'Win';
        combination.map((el) => {
          const oneCell = cells[el];
          oneCell.style.cssText = "background-color: #02bbd5; transition: background-color 0.4s ease";
        });
        area.removeEventListener("click", clickHandler);
        return true;
      }
  }
  return false;
}

