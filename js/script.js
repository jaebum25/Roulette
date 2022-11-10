/*----- constants -----*/
const winMultiplier = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 12, 4,];

/*----- app's state (variables) -----*/

let spinHistory = [];
let winNum = 0
let wager = 0;
let bankBal = 100;
let chipVal = 0
let totalWinSum = 0
// this will change depending on what is bet
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// This will assign a value of 1 to the number and 1 to the color
let winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/*----- cached element references -----*/

let cellsEls = document.querySelectorAll(".cell");
let spinBtn = document.querySelector("#spin");
let betlogEl = document.getElementById("betlog");
let wheelEl = document.getElementById("wheel");
let betAmtEl = document.getElementById("betamt");
let betBalEl = document.getElementById("betbal");
let winAlertEl = document.querySelector(".win-alert")

/*----- event listeners -----*/

spinBtn.addEventListener("click", handleSpin);


/*----- functions -----*/

function handleSpin() {
  winNum = spinWheel();
  logSpinHistory();
  styleWheel();
  resetWager();
  updateWinner();
  calcWinnings();
  resetWinner();
  resetBoard();
}

// This is good and complete
function spinWheel() {
    return Math.floor(Math.random() * 13);
}

// This is good and complete
function logSpinHistory() {
    wheelEl.innerText = winNum;
    spinHistory.unshift(winNum);
    betlogEl.innerText = spinHistory.slice(0, 12);
    // informational console log
    console.log(`lucky number: ${winNum}`);
}

// This is good and complete
function styleWheel() {
    // styling the wheel color
    if (winNum === 0) {
        wheelEl.style.backgroundColor = "#1dff00";
    } else {
        wheelEl.style.backgroundColor = winNum % 2 !== 1 ? "black" : "#ff6c00";
        wheelEl.style.color = winNum % 2 !== 1 ? "#ff6c00" : "black";
    }
}

// This is good and complete
function resetWager() {
    // sets wager text to $0 after each click
    betAmtEl.innerText = `BET $${0}`;
    wager = 0;
}

// This is good and complete
function updateWinner() {
  if (winNum === 0) {
    winner[13] = 1;
  } else {
    winner[winNum - 1] = 1;
    winNum % 2 !== 1 ? (winner[12] = 1) : (winner[14] = 1);
  }
  console.log(winner)
}

//This is good and complete
function calcWinnings() {
  let totalWinArray = [];
  // this multiplies the 3 arrays into 1 array as a product
  for (i = 0; i < winMultiplier.length; i++) {
    totalWinArray[i] = winner[i] * winMultiplier[i] * board[i];
  }
  let totalWinSum = 0
  // this takes the new 1 array product, and sums each element to 1 value
  for (i = 0; i < totalWinArray.length; i++) {
    totalWinSum += totalWinArray[i];
  }
  winAlertEl.textContent = `Wins ${totalWinSum}` 
  console.log(totalWinSum)
  console.log(totalWinArray)
  bankBal = bankBal + totalWinSum
  betBalEl.innerText = `BAL $${bankBal}`;
  // this would be the total $ you won based on bet x winning number x win multipliers
  //informational console log
  console.log(`total winnings: ${totalWinSum}`);
}

// This is good and complete
function resetWinner() {
  winner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// This is good and complete
function resetBoard() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// This is good and complete
cellsEls.forEach((cell) => {
  cell.addEventListener("click", function handleClick(evt) {
    wager += chipVal
    bankBal -= chipVal
    betAmtEl.innerText = `BET $${wager}`;
    betBalEl.innerText = `BAL $${bankBal}`;
    board[evt.target.id] += chipVal;
    console.log(board);
  });
});

// This is good and complete
function storeVal(v) {
    chipVal = parseInt(v);
    // this sets global chipVal
    console.log(chipVal)
}