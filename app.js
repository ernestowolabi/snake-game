const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
const pauseBtn = document.getElementById('pause')
const resumeBtn = document.getElementById('resume')




function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId)

  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0] + direction)

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    generateApple()
    score++
    scoreDisplay.textContent = score
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }

  squares[currentSnake[0]].classList.add('snake')
}




function control(event) {
  if (event.key === "ArrowLeft") {
    console.log("left key pressed")
    direction = -1
  } else if (event.key === "ArrowUp") {
    console.log("up key pressed")
    direction = -width
  } else if (event.key === "ArrowRight") {
    console.log("right key pressed")
    direction = 1
  } else if (event.key === "ArrowDown") {
    console.log("down key pressed")
    direction = +width

  }
}



document.addEventListener("keydown", control)

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)

  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}




function startGame() {
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  currentSnake = [2,1,0]
  clearInterval(timerId)
  score = 0
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 1000
  generateApple()
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  timerId = setInterval(move, intervalTime)
  pauseBtn.style.display = 'inline-block'


}


startButton.addEventListener('click', startGame)


function pause() {
  clearInterval(timerId)
  pauseBtn.style.display = 'none'
  resumeBtn.style.display = 'inline-block'

}

function resume() {
  timerId = setInterval(move, intervalTime)
  pauseBtn.style.display = 'inline-block'
  resumeBtn.style.display = 'none'
}

pauseBtn.style.display = 'none'
resumeBtn.style.display = 'none'

pauseBtn.addEventListener('click', pause)
resumeBtn.addEventListener('click', resume)