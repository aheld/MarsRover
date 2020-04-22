const deepCopy = require('./deep_copy')

function parseMultiCommands (stringInput) {
  const lines = stringInput.split('\n')
  const board = lines[0]
  const botsAndMoves = lines.splice(1)
  const extractSingleBotCmds = (cmdArray, inputArray) => {
    if (inputArray.length <= 0) return cmdArray
    const [startPosition, moves, ...tail] = inputArray
    cmdArray.push([board, startPosition, moves].join('\n'))
    return extractSingleBotCmds(cmdArray, tail)
  }
  // easier logic
  // const singleBotCommands = []
  // for (let index = 0; index < botsAndMoves.length; index += 2) {
  //   const bot = botsAndMoves[index]
  //   const moves = botsAndMoves[index + 1]
  //   singleBotCommands.push([board, bot, moves].join('\n'))
  // }
  // return singleBotCommands
  return extractSingleBotCmds([], botsAndMoves)
}

function parseCommands (stringInput) {
  const [board, startingPosition, moves] = stringInput.split('\n')
  const [x, y, facing] = startingPosition.split(' ')
  function getBoardPoints (board) {
    const [x, y] = board.split(' ').map((i) => parseInt(i))
    return { x, y }
  }

  return {
    board: getBoardPoints(board),
    startingPosition: {
      x: parseInt(x),
      y: parseInt(y),
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

function turn (cmd, lookup) {
  return function (roverCommand) {
    if (roverCommand.moves[0] !== cmd) return roverCommand

    const newPosition = {
      x: roverCommand.startingPosition.x,
      y: roverCommand.startingPosition.y,
      facing: lookup[roverCommand.startingPosition.facing]
    }
    return _processMoveAndUpdatePosition(roverCommand, newPosition)
  }
}

const turnLeft = (() => {
  const leftTurn = new Map()
  leftTurn.N = 'W'
  leftTurn.W = 'S'
  leftTurn.S = 'E'
  leftTurn.E = 'N'
  const cmd = 'L'

  return turn(cmd, leftTurn)
})()

const turnRight = (() => {
  const rightTurn = new Map()
  rightTurn.N = 'E'
  rightTurn.W = 'N'
  rightTurn.S = 'W'
  rightTurn.E = 'S'
  const cmd = 'R'

  return turn(cmd, rightTurn)
})()

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

function keepRoverOnBoard (roverCommand) {
  // console.log(roverCommand)
  // if (roverCommand.startingPosition.y > roverCommand.board.y) console.log(roverCommand)
  const newRoverCommand = deepCopy(roverCommand)
  if (roverCommand.startingPosition.x < 0) newRoverCommand.startingPosition.x = 0
  if (roverCommand.startingPosition.x > roverCommand.board.x) newRoverCommand.startingPosition.x = roverCommand.board.x
  if (roverCommand.startingPosition.y < 0) newRoverCommand.startingPosition.y = 0
  if (roverCommand.startingPosition.y > roverCommand.board.y) newRoverCommand.startingPosition.y = roverCommand.board.y

  // if (roverCommand.startingPosition.y > roverCommand.board.y) console.log(newRoverCommand)

  return newRoverCommand
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
  roverCommand = keepRoverOnBoard(roverCommand)
  return processMoves(roverCommand)
}

function processSingleBot (commands) {
  return pipeline(commands, parseCommands, processMoves, formatPosition)
}

function fanoutCommands (multiRoverCommands) {
  return multiRoverCommands.map(processSingleBot)
}

function formatResultsToString (arrayOfRoverPositions) {
  return arrayOfRoverPositions.join('\n')
}

module.exports = function (stringInput) {
  return pipeline(
    stringInput,
    parseMultiCommands,
    fanoutCommands,
    formatResultsToString
  )
}
