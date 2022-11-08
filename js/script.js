/*----- constants -----*/
const winMultiplier = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 2, 12, 2]

/*----- app's state (variables) -----*/

let spinHistory = []
let winNum
let wager
let betamtEl
let betbalEl = 100
// this will change depending on what is bet
let board = [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5]
// This will assign a value of 1 to the number and 1 to the color
let winner = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] 

// this multiplies the 3 arrays into 1 array as a product
totalWinArray = []
for (i = 0; i < winMultiplier.length; i++) {
    totalWinArray[i] = winner[i] * winMultiplier[i] * board[i]
}

// this takes the new 1 array product, and sums each element to 1 value
let totalWinSum = 0
for(i = 0; i < totalWinArray.length; i++) {
    totalWinSum += totalWinArray[i];
}
// this would be the total $ you won based on bet x winning number x win multipliers
console.log(`total winnings: ${totalWinSum}`)

/*----- cached element references -----*/

const cellsEls = document.querySelectorAll('.cell')
const spinBtn = document.querySelector('#spin')
const betlogEl = document.getElementById('betlog')
const wheelEl = document.getElementById('wheel')
const betAmtEl = document.getElementById('betamt')
const betBalEl = document.getElementById('betbal')

/*----- event listeners -----*/

spinBtn.addEventListener('click', handleSpin)
// cellsEls.addEventListener('click', handleBet)


/*----- functions -----*/
function handleSpin() {
    winNum = spinWheel()
    spinHistory.unshift(winNum)
    console.log(winNum)
    betlogEl.innerText = spinHistory.slice(0, 15)
    wheelEl.innerText = winNum
    if (winNum === 0) {
        wheelEl.style.backgroundColor = 'green';
    } else {
        wheelEl.style.backgroundColor = winNum % 2 !== 1 ? "black" : "red";
    }
    // sets betamt text to $0 after each click
    betAmtEl.innerText = `BET $${0}`
    wager = 0
}

function spinWheel() {
    return Math.floor(Math.random() * 12)
}

cellsEls.forEach(cell => {
    cell.addEventListener('click', function handleClick(evt) {
        wager++
        console.log(evt.target.id)
        console.log(`wager = ${wager}`)
// sets the wager to X based on clicking
        betAmtEl.innerText = `BET $${wager}`
// sets betbal to = the difference between the curr betbal and the curr wager before spininng
        betBalEl.innerText = `BAL $${betbalEl - wager}`
    })
})