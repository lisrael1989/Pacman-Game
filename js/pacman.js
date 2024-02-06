"use strict";

const PACMAN = "😀";
// var PACMAN_IMG = '<img src="img/game.png">'; //update img
var gPacman;

function createPacman(board) {
  // DONE: initialize gPacman...
  gPacman = {
    location: {
      i: 2,
      j: 2,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function onMovePacman(ev) {
  if (!gGame.isOn) return;

  const nextLocation = getNextLocation(ev.key);
  const nextCell = gBoard[nextLocation.i][nextLocation.j];

  // DONE: return if cannot move
  if (nextCell === WALL) return;

  // DONE: hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper) removeGhost(nextLocation);
    else {
      gameOver();
      return;
    }
  }

  if (nextCell === FOOD) updateScore(1);

  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    superPowerMode();
  }
  if (nextCell === CHERRY) updateScore(10);

  // DONE: moving from current location:
  // DONE: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // DONE: update the DOM
  renderCell(gPacman.location, EMPTY);

  // DONE: Move the pacman to new location:
  // DONE: update the model
  gPacman.location = nextLocation;
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  // DONE: update the DOM
  renderCell(nextLocation, PACMAN);
}

function getNextLocation(eventKeyboard) {
  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  var className = "";

  switch (eventKeyboard) {
    case "ArrowUp":
      nextLocation.i--;
      className = "up";
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
    case "ArrowDown":
      nextLocation.i++;
      className = "down";
      break;
    case "ArrowLeft":
      nextLocation.j--;
      className = "left";
      break;
  }
  // PACMAN_IMG = `<img class="${className}" src="img/game.png">`;
  return nextLocation;
}
