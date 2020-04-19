function parseCommands (stringInput) {
  const [, startingPosition] = stringInput.split('\n')
  return {
    startingPosition
  }
}

module.exports = function (commands) {
  return parseCommands(commands).startingPosition
}
