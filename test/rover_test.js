const expect = require('chai').expect
const assert = require('assert').strict

const rover = require('../rover')

function genCmd (...bots) {
  let botStarts = ''
  for (let index = 0; index < bots.length; index += 4) {
    const x = bots[index]
    const y = bots[index + 1]
    const facing = bots[index + 2]
    const moves = bots[index + 3]
    botStarts += `\n${x} ${y} ${facing}`
    if (moves) botStarts += '\n' + moves
  }
  return '5000 5000' + botStarts
}

describe("Rover that doesn't move", function () {
  it('should not move for simple input', function () {
    expect(rover(genCmd(1, 1, 'N'))).to.equal('1 1 N')
  })
  it('should pass property based testing', function () {
    this.timeout(150000)
    // forall (f: noMoveInput) -> roverPosition) => starting point
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        'N S E W'.split(' ').forEach(facing => {
          const simpleInput = genCmd(x, y, facing)
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${facing}`)
        })
      }
    }
  })
})

describe('Rover that turns', function () {
  it('should turn left for simple input', function () {
    expect(rover(genCmd(1, 1, 'N', 'L'))).to.equal('1 1 W')
  })
  it('should turn right for simple input', function () {
    expect(rover(genCmd(1, 1, 'N', 'R'))).to.equal('1 1 E')
  })
  it('should pass property based testing', function () {
    this.timeout(150000)
    // forall (f: noMoveInput) -> roverPosition) => starting point
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        ['N R E',
          'N L W',
          'S R W',
          'S L E',
          'E R S',
          'W R N',
          'E L N',
          'W L S'].forEach(testcase => {
          const [facing, turn, newFacing] = testcase.split(' ')
          const simpleInput = genCmd(x, y, facing, turn)
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${newFacing}`)
        })
      }
    }
  })
})

describe('Rover that Moves', function () {
  it('should move north for simple input', function () {
    expect(rover(genCmd(1, 1, 'N', 'M'))).to.equal('1 2 N')
  })
  it('should move south right for simple input', function () {
    expect(rover(genCmd(1, 1, 'S', 'M'))).to.equal('1 0 S')
  })
  it('should pass property based testing', function () {
    this.timeout(150000)
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        ['N R E',
          'N L W',
          'S R W',
          'S L E',
          'E R S',
          'W R N',
          'E L N',
          'W L S'].forEach(testcase => {
          const [facing, turn, newFacing] = testcase.split(' ')
          const simpleInput = genCmd(x, y, facing, turn)
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${newFacing}`)
        })
      }
    }
  })
})

describe('Rover that Turns and Moves multiple times', function () {
  it('should move for known input', function () {
    expect(rover(genCmd(1, 1, 'N', 'MRM'))).to.equal('2 2 E')
  })
  it('should move south right for simple input', function () {
    expect(rover(genCmd(1, 1, 'S', 'MLLMM'))).to.equal('1 2 N')
  })
  it('multiple moves should pass property based testing', function () {
    this.timeout(150000)
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        ['N R E'].forEach(testcase => {
          const [facing, turn, newFacing] = testcase.split(' ')
          const simpleInput = genCmd(x, y, facing, `M${turn}M`)
          assert.strictEqual(rover(simpleInput), `${x + 1} ${y + 1} ${newFacing}`)
        })
      }
    }
  })
})

describe('Rover that makes multipe turns are equal', function () {
  it('multiple moves should pass property based testing', function () {
    this.timeout(150000)
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        const simpleInputRL = genCmd(x, y, 'N', 'RMLMRMLMRMLM')
        const roverRL = rover(simpleInputRL)
        const simpleInputLR = genCmd(x, y, 'N', 'MRMLMRMLMRML')
        const roverLR = rover(simpleInputLR)
        assert.strictEqual(roverRL, roverLR)
      }
    }
  })
})

describe('Multiple Rovers that makes multipe turns are equal', function () {
  it('mutliple rovers should move at the same time', function () {
    const simpleInput = genCmd(1, 1, 'N', 'RMLMRMLMRMLM', 2, 2, 'N', 'RMLMRMLMRMLM')
    const roverPos = rover(simpleInput)
    assert.strictEqual(roverPos, '4 4 N\n5 5 N')
  })
  it('multiple moves should pass property based testing', function () {
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        const simpleInputRL = genCmd(x, y, 'N', 'RMLMRMLMRMLM', x + 1, y + 1, 'N', 'MRMLMRMLMRML')
        const roverRL = rover(simpleInputRL)
        const simpleInputLR = genCmd(x, y, 'N', 'MRMLMRMLMRML', x + 1, y + 1, 'N', 'RMLMRMLMRMLM')
        const roverLR = rover(simpleInputLR)
        //  console.log(simpleInputLR, '\n\n', roverLR)
        assert.strictEqual(roverRL, roverLR)
      }
    }
  })
})
