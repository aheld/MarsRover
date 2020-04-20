/* eslint-env mocha */
const expect = require('chai').expect
const assert = require('assert').strict

const rover = require('../rover')

describe("Rover that doesn't move", function () {
  it('should not move for simple input', function () {
    const noMoveInput = '5000 5000\n1 1 N'
    expect(rover(noMoveInput)).to.equal('1 1 N')
  })
  it('should pass property based testing', function () {
    this.timeout(150000)
    // forall (f: noMoveInput) -> roverPosition) => starting point
    const testRange = 100
    for (let x = 0; x < testRange; x++) {
      for (let y = 0; y < testRange; y++) {
        for (const facing in 'N S E W'.split(' ')) {
          const simpleInput = `5 5\n${x} ${y} ${facing}`
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${facing}`)
        }
      }
    }
  })
})
