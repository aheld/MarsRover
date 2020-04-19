const deepCopy = require('./deep_copy')

function parseCommands (stringInput) {
  const [, startingPosition, moves] = stringInput.split('\n')
  const [x, y, facing] = startingPosition.split(' ')
  const roverCommand = {
    startingPosition: {
      x,
      y,
      facing
    },
    moves: moves || []
  }
  return roverCommand
}

// Turn Related functions
function _processMoveAndUpdateFacing (roverCommand, newFacing) {
  const newRoverCommand = deepCopy(roverCommand)
  newRoverCommand.startingPosition.facing = newFacing
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

  const newFacing = leftTurn[roverCommand.startingPosition.facing]
  return _processMoveAndUpdateFacing(roverCommand, newFacing)
}

function turnRight (roverCommand) {
  if (roverCommand.moves[0] !== 'R') return roverCommand

  const rightTurn = new Map()
  rightTurn.N = 'E'
  rightTurn.W = 'N'
  rightTurn.S = 'W'
  rightTurn.E = 'S'

  const newFacing = rightTurn[roverCommand.startingPosition.facing]
  return _processMoveAndUpdateFacing(roverCommand, newFacing)
}

function formatPosition (roverCommand) {
  const x = roverCommand.startingPosition.x
  const y = roverCommand.startingPosition.y
  const f = roverCommand.startingPosition.facing
  return `${x} ${y} ${f}`
}

module.exports = function (commands) {
  commands = parseCommands(commands)
  commands = turnLeft(commands)
  commands = turnRight(commands)
  return formatPosition(commands)
}
