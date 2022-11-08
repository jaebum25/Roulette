/*----- constants -----*/

/*----- app's state (variables) -----*/

let answers = []
// use unshift

/*----- cached element references -----*/

const cellsEls = document.querySelectorAll('.cell')
const spinBtn = document.querySelector('#spin')
const betlogEl = document.getElementById('betlog')
const wheelEl = document.getElementById('wheel')

/*----- event listeners -----*/

spinBtn.addEventListener('click', handleSpin)
// cellsEls.addEventListener('click', handleBet)


/*----- functions -----*/
let num = 0
function handleSpin() {
    num = spinWheel()
    answers.unshift(num)
    console.log(num)
    betlogEl.innerText = answers.slice(0, 10)
    // get the first 10 elements of an array (look up slice method)
    wheelEl.innerText = num
    if (num === 0) {
        wheelEl.style.backgroundColor = 'green';
    } else {
        wheelEl.style.backgroundColor = num % 2 !== 1 ? "black" : "red";
    }
}

function spinWheel() {
    return Math.floor(Math.random() * 12)
}

spinWheel()

// cellsEls.forEach(cell => {
//     cell.addEventListener('click', function handleClick(evt) {
//         console.log(evt.target.id)
//     })
// })
