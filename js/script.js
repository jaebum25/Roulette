/*----- constants -----*/
const winMultiplier = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 12, 4,];

/*----- app's state (variables) -----*/

let spinHistory = [];
let winNum = 0;
let wager = 0;
let betamtEl = 0;
let bankBal = 100;
let chipVal = 0
// this will change depending on what is bet
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// This will assign a value of 1 to the number and 1 to the color
let winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/*----- cached element references -----*/

const cellsEls = document.querySelectorAll(".cell");
const spinBtn = document.querySelector("#spin");
const betlogEl = document.getElementById("betlog");
const wheelEl = document.getElementById("wheel");
const betAmtEl = document.getElementById("betamt");
const betBalEl = document.getElementById("betbal");
const betchipsEl = document.querySelectorAll(".betchips");
let chip5El = document.getElementById("chip5");
let chip10El = document.getElementById("chip10");
let chip25El = document.getElementById("chip25");
let chip50El = document.getElementById("chip50");
let chip100El = document.getElementById("chip100");

/*----- event listeners -----*/

spinBtn.addEventListener("click", handleSpin);

// chip5El.addEventListener('click', handleChip)
// chip10El.addEventListener('click', handleChip)
// chip25El.addEventListener('click', handleChip)
// chip50El.addEventListener('click', handleChip)
// chip100El.addEventListener('click', handleChip)
// cellsEls.addEventListener('click', handleBet)

/*----- functions -----*/

function handleSpin() {
  winNum = spinWheel();
  logSpinHistory();
  if (winNum === 0) {
    wheelEl.style.backgroundColor = "#1dff00";
  } else {
    wheelEl.style.backgroundColor = winNum % 2 !== 1 ? "black" : "#ff6c00";
    wheelEl.style.color = winNum % 2 !== 1 ? "#ff6c00" : "black";
  }
  // sets wager text to $0 after each click
  betAmtEl.innerText = `BET $${0}`;
  wager = 0;
  updateWinner();
  console.log(winner);
  calcWinnings();
  // Need to have winnings multiplied here before we reset our board
  resetWinner();
  resetBoard();
  console.log(winner);
}

// This is good and complete
function logSpinHistory() {
  wheelEl.innerText = winNum;
  spinHistory.unshift(winNum);
  console.log(winNum);
  betlogEl.innerText = spinHistory.slice(0, 12);
}

// This is good and complete
function spinWheel() {
  return Math.floor(Math.random() * 13);
}

function updateBoard() {
  board[evt.target.id] = 7;
}

// This is good and complete
function resetBoard() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// This is good and complete
function updateWinner() {
  if (winNum === 0) {
    winner[13] = 1;
  } else {
    winner[winNum - 1] = 1;
    winNum % 2 !== 1 ? (winner[12] = 1) : (winner[14] = 1);
  }
}

// This is good and complete
function resetWinner() {
  // winner[winNum] = 0
  winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

cellsEls.forEach((cell) => {
  cell.addEventListener("click", function handleClick(evt) {
      // total my wager, and have a separte var for chipVal.
    wager += chipVal
    bankBal -= chipVal
    console.log(evt.target.id);
    // console.log(`wager = ${wager}`)
    // sets the wager to X based on clicking
    betAmtEl.innerText = `BET $${wager}`;
    // sets betbal to = the differencse between the curr betbal and the curr wager before spininng
    betBalEl.innerText = `BAL $${bankBal}`;
    // updateBoard()
    board[evt.target.id] += chipVal;
    console.log(board);
  });
});
//This is good and complete
function calcWinnings() {
  let totalWinArray = [];
  // this multiplies the 3 arrays into 1 array as a product
  for (i = 0; i < winMultiplier.length; i++) {
    totalWinArray[i] = winner[i] * winMultiplier[i] * board[i];
  }
  let totalWinSum = 0;
  // this takes the new 1 array product, and sums each element to 1 value
  for (i = 0; i < totalWinArray.length; i++) {
    totalWinSum += totalWinArray[i];
  }
  // this would be the total $ you won based on bet x winning number x win multipliers
  console.log(`total winnings: ${totalWinSum}`);
}

function storeVal(v) {
    chipVal = parseInt(v);
    // this sets global chipVal
    console.log(chipVal)
}