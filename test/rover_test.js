/* eslint-env mocha */
const expect = require('chai').expect
const assert = require('assert').strict

const rover = require('../rover')

describe("Rover that doesn't move", function () {
  it('should not move for simple input', function () {
    const noMoveInput = '5 5\n1 1 N'
    expect(rover(noMoveInput)).to.equal('1 1 N')
  })
  it('should pass property based testing', function () {
    this.timeout(150000)
    // forall (f: noMoveInput) -> roverPosition) => starting point
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        'N S E W'.split(' ').forEach(facing => {
          const simpleInput = `5 5\n${x} ${y} ${facing}`
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${facing}`)
        })
      }
    }
  })
})

describe('Rover that turns', function () {
  it('should turn left for simple input', function () {
    const noMoveInput = '5 5\n1 1 N\nL'
    expect(rover(noMoveInput)).to.equal('1 1 W')
  })
  it('should turn right for simple input', function () {
    const noMoveInput = '5 5\n1 1 N\nR'
    expect(rover(noMoveInput)).to.equal('1 1 E')
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
          const simpleInput = `5 5\n${x} ${y} ${facing}\n${turn}`
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${newFacing}`)
        })
      }
    }
  })
})
