export default function restartGame(player_1, player_2, gameField, functionCreateField, functionHandler) {
  player_1.moves = [];
  player_1.isMadeMove = false;
  player_1.status = 'in progres';
  player_2.moves = [];
  player_2.isMadeMove = true;
  player_2.status = 'in progres';
  functionCreateField(gameField);
  gameField.addEventListener("click", functionHandler);
  // console.log('сделан рестарт')
  // console.log('из рестарта', player_1)
  // console.log('из рестарта', player_2)
}
