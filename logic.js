let players = ['x', 'o'];
let activePlayer = 0;
let curentPlayer = '';//текущая метка
let board = [];//игровое поле
let firstLabel;
let secondLabel;
let rowIndex; //строка события 'Click'
let colIndex; //колонка события 'Click'
let winner;//

function startGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  renderBoard(board);

  activePlayer = 1; //первый ход

  firstLabel = Math.round(Math.random()); //первый player
  secondLabel = 1 - firstLabel; //второй player
}

function click(rowIndex, colIndex) {
  
  activePlayer++; //счетчик ходов
  
  if (activePlayer > 9) {
    showDraw();
  }//объявление о ничьей

  function showDraw() {
    let header = modalEl.getElementsByTagName('h2')[0];
    header.textContent = `🍾 Ничья! 🍾`;
    modalEl.classList.remove('hidden');
    activePlayer = 0;
  }

  if (activePlayer % 2) {
    curentPlayer = players[secondLabel];
  } else {
    curentPlayer = players[firstLabel];
  }//чередование ходов

  let boardCell = document.getElementById('board');
  boardCell.addEventListener('click', function (event) {
    let targetData = event.target.dataset;
    rowIndex = Number(targetData.row);
    colIndex = Number(targetData.col);
  });//получение индексов кликнутой ячейки

  board[rowIndex][colIndex] = curentPlayer;//отметка текущего игрока в кликнутой ячейке

  renderBoard(board);//отображение текущего состояния игры

  if (
    (board[rowIndex][0] == curentPlayer && board[rowIndex][1] == curentPlayer && board[rowIndex][2] == curentPlayer) ||
    (board[0][colIndex] == curentPlayer && board[1][colIndex] == curentPlayer && board[2][colIndex] == curentPlayer) ||
    (board[0][0] == curentPlayer && board[1][1] == curentPlayer && board[2][2] == curentPlayer) ||
    (board[0][2] == curentPlayer && board[1][1] == curentPlayer && board[2][0] == curentPlayer)
    ) {
      if(activePlayer % 2) {
        winner = 1;
      } else {
        winner = 0;
    }
    showWinner(winner);
    activePlayer = 0;
  }//проверка на выигрыш
}
