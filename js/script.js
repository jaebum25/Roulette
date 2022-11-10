/*----- constants -----*/
const winMultiplier = [
  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 12, 4,
];

/*----- app's state (variables) -----*/

let spinHistory = [];
let winNum = 0;
let wager = 0.01;
let bankBal = 100;
let chipVal = 0;
let totalWinSum = 0;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/*----- cached element references -----*/

let cellsEls = document.querySelectorAll(".cell");
let spinBtnEl = document.querySelector("#spin");
let betlogEl = document.getElementById("betlog");
let wheelEl = document.getElementById("wheel");
let betAmtEl = document.getElementById("betamt");
let betBalEl = document.getElementById("betbal");
let winAlertEl = document.querySelector(".win-alert");

/*----- event listeners -----*/

spinBtnEl.addEventListener("click", handleSpin);

/*----- functions -----*/

cellsEls.forEach((cell) => {
  cell.addEventListener("click", function clickCell(evt) {
    if (bankBal > 0 && wager >= 0) {
      if (chipVal > bankBal) {
        chipVal = 0;
      }
      wager += chipVal;
      bankBal -= chipVal;
      betAmtEl.innerText = `BET $${Math.floor(wager)}`;
      betBalEl.innerText = `BAL $${bankBal}`;
      board[evt.target.id] += chipVal;
    }
  });
});

function storeVal(v) {
  chipVal = parseInt(v);
}

function handleSpin() {
  if (bankBal >= 0 && wager >= 0) {
    winNum = spinWheel();
    logSpinHistory();
    styleWheel();
    resetWager();
    updateWinner();
    calcWinnings();
    resetWinner();
    resetBoard();
  }
}

function spinWheel() {
  return Math.floor(Math.random() * 13);
}

function logSpinHistory() {
  wheelEl.innerText = winNum;
  spinHistory.unshift(winNum);
  betlogEl.innerText = spinHistory.slice(0, 12);
}

function styleWheel() {
  if (winNum === 0) {
    wheelEl.style.backgroundColor = "#1dff00";
  } else {
    wheelEl.style.backgroundColor = winNum % 2 !== 1 ? "black" : "#ff6c00";
    wheelEl.style.color = winNum % 2 !== 1 ? "#ff6c00" : "black";
  }
}

function resetWager() {
  betAmtEl.innerText = `BET $${0}`;
  wager = 0;
}

function updateWinner() {
  if (winNum === 0) {
    winner[13] = 1;
  } else {
    winner[winNum - 1] = 1;
    winNum % 2 !== 1 ? (winner[12] = 1) : (winner[14] = 1);
  }
}

function calcWinnings() {
  let totalWinArray = [];
  for (i = 0; i < winMultiplier.length; i++) {
    totalWinArray[i] = winner[i] * winMultiplier[i] * board[i];
  }
  let totalWinSum = 0;
  for (i = 0; i < totalWinArray.length; i++) {
    totalWinSum += totalWinArray[i];
  }
  if (totalWinSum > 0) {
    winAlertEl.textContent = `Here's a treat! $${totalWinSum}`;
    winAlertEl.style.color = "#1dff00";
  } else if (totalWinSum === 0 && wager === 0 && bankBal === 0) {
    winAlertEl.textContent = `Has anybody ever told you, you have a SERIOUS IMPULSE CONTROL PROBLEM?!`;
    winAlertEl.style.color = "#9700f8";
    winAlertEl.style.backgroundColor = "#1dff00";
    wheelEl.innerText = "¿";
    wheelEl.style.color = "black";
    wheelEl.style.backgroundColor = "#1dff00";
    spinBtnEl.innerHTML = "You lose!";
  } else {
    winAlertEl.textContent = `Tricked ya! haha :P`;
    winAlertEl.style.color = "rgb(233, 0, 0)";
  }
  bankBal = bankBal + totalWinSum;
  betBalEl.innerText = `BAL $${bankBal}`;
}

function resetWinner() {
  winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function resetBoard() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
