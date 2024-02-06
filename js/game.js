"use strict";

const WALL = "🧱";
const FOOD = ".";
const EMPTY = " ";
const SUPER_FOOD = "🍕";
const CHERRY = "🍒";

const CHERRY_POINTS = 10;
const CHERRY_INTERVAL = 15000;

const gGame = {
  score: 0,
  foodCount: 56,
  isOn: false,
};
var gBoard;

function onInit() {
  hideModal();
  gGame.foodCount = 56;
  updateScore(0);
  gBoard = buildBoard();
  createGhosts(gBoard);
  createPacman(gBoard);
  renderBoard(gBoard);
  setInterval(placeCherryRandomly, CHERRY_INTERVAL);

  gGame.isOn = true;
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPER_FOOD;
  board[1][8] = SUPER_FOOD;
  board[8][1] = SUPER_FOOD;
  board[8][8] = SUPER_FOOD;

  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += "</tr>";
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function updateScore(diff) {
  // DONE: update model and dom
  if (!diff) {
    gGame.score = 0;
  } else {
    gGame.score += diff;
    if (diff === 1) {
      gGame.foodCount--;
      console.log(gGame.foodCount);
    }
  }
  document.querySelector("span.score").innerText = gGame.score;

  if (IsVictory()) {
    Victorymodal();
  }
}

function gameOver() {
  renderCell(gPacman.location, "🪦");
  console.log("Game Over");
  clearInterval(gIntervalGhosts);
  clearInterval(CHERRY_INTERVAL);
  gGame.isOn = false;
  showModal();
}

function showModal() {
  const elModal = document.querySelector(".modal");
  elModal.classList.remove("hide");
}

function hideModal() {
  const elModal = document.querySelector(".modal");
  elModal.classList.add("hide");
}

function IsVictory() {
  return gGame.foodCount === 0;
}

function Victorymodal() {
  const victoryModal = document.querySelector(".modal");
  victoryModal.classList.remove("hide");
  victoryModal.innerText = "Victory🏆 ";
}

function placeCherryRandomly() {
  const emptyLocations = getEmptyLocations();
  if (emptyLocations.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyLocations.length);
    const randomLocation = emptyLocations[randomIndex];
    //model
    gBoard[randomLocation.i][randomLocation.j] = CHERRY;
    //DOM
    renderBoard(gBoard);
  }
}

function getEmptyLocations() {
  const emptyLocations = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyLocations.push({ i, j });
      }
    }
  }
  return emptyLocations;
}

function superPowerMode() {
  gPacman.isSuper = true;
  gRemovedGhosts = [];
  setTimeout(() => {
    gPacman.isSuper = false;
    gGhosts = gGhosts.concat(gRemovedGhosts);
    console.log("gGhostsAfter5Sec:", gGhosts);
  }, 5000);
}
