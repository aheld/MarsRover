const deepCopy = require('./deep_copy')

function parseCommands (stringInput) {
  const [, startingPosition, moves] = stringInput.split('\n')
  const [x, y, facing] = startingPosition.split(' ')
  return {
    startingPosition: {
      x,
      y,
      facing
    },
    moves: moves || ''
  }
}

// Move Related functions
function _processMoveAndUpdatePosition (roverCommand, newPosition) {
  const newRoverCommand = deepCopy(roverCommand)
  newRoverCommand.startingPosition = newPosition
  newRoverCommand.moves = newRoverCommand.moves.slice(1)
  return newRoverCommand
}

function turnLeft (roverCommand) {
  if (roverCommand.moves[0] !== 'L') return roverCommand

  const leftTurn = new Map()
  leftTurn.N = 'W'
  leftTurn.W = 'S'
  leftTurn.S = 'E'
  leftTurn.E = 'N'

  const newPosition = {
    x: roverCommand.startingPosition.x,
    y: roverCommand.startingPosition.y,
    facing: leftTurn[roverCommand.startingPosition.facing]
  }
  return _processMoveAndUpdatePosition(roverCommand, newPosition)
}

function turnRight (roverCommand) {
  if (roverCommand.moves[0] !== 'R') return roverCommand

  const rightTurn = new Map()
  rightTurn.N = 'E'
  rightTurn.W = 'N'
  rightTurn.S = 'W'
  rightTurn.E = 'S'

  const newPosition = {
    x: roverCommand.startingPosition.x,
    y: roverCommand.startingPosition.y,
    facing: rightTurn[roverCommand.startingPosition.facing]
  }
  return _processMoveAndUpdatePosition(roverCommand, newPosition)
}

function moveRover (roverCommand) {
  if (roverCommand.moves[0] !== 'M') return roverCommand

  const moveMatrix = new Map()
  moveMatrix.N = [0, 1]
  moveMatrix.W = [-1, 0]
  moveMatrix.S = [0, -1]
  moveMatrix.E = [1, 0]

  const selectedMatrix = moveMatrix[roverCommand.startingPosition.facing]
  const newPosition = {
    x: parseInt(roverCommand.startingPosition.x) + selectedMatrix[0],
    y: parseInt(roverCommand.startingPosition.y) + selectedMatrix[1],
    facing: roverCommand.startingPosition.facing
  }

  return _processMoveAndUpdatePosition(roverCommand, newPosition)
}

function formatPosition (roverCommand) {
  const x = roverCommand.startingPosition.x
  const y = roverCommand.startingPosition.y
  const f = roverCommand.startingPosition.facing
  return `${x} ${y} ${f}`
}

function pipeline (input, ...funcs) {
  return funcs.reduce((acc, f) => f(acc), input)
}

// simpler way to implement pipeline
// function pipeline(input, ...funcs) {
//   let res = input
//   funcs.forEach(func => {
//     res = func(res)
//   })
//   return res
// }

function processMoves (roverCommand) {
  if (roverCommand.moves.length === 0) return roverCommand
  roverCommand = turnLeft(roverCommand)
  roverCommand = turnRight(roverCommand)
  roverCommand = moveRover(roverCommand)
  return processMoves(roverCommand)
}

module.exports = function (commands) {
  return pipeline(commands,
    parseCommands,
    processMoves,
    formatPosition)
}
