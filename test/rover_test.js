const expect = require('chai').expect
const assert = require('assert')

const rover = require('../rover')

describe('Rover that doesn\'t move', function () {
  it('should not move for simple input', function () {
    const noMoveInput = '5 5\n1 1 N'
    expect(rover(noMoveInput)).to.equal('1 1 N')
  })
  it.skip('should pass property based testing', function () {
    // forall (f: noMoveInput) -> roverPosition) => starting point
    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        for (let facing in 'N S E W'.split(' ')) {
          const simpleInput = `5000 5000\n${x} ${y} ${facing}`
          assert.strictEqual(rover(simpleInput), `${x} ${y} ${facing}`)
        }
      }
    }
  })
})

describe.skip('Rover that makes left turns', function () {
  it('should turn left', function () {
    const noMoveInput = '5000 5000\n1 1 N\nL'
    expect(rover(noMoveInput)).to.equal('1 1 W')
  })
  it('should pass property based testing', function () {
    // forall (f: noMoveInput) -> roverPosition) => starting point
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        const simpleInput = `5000 5000\n${x} ${y} N\nL`
        assert.strictEqual(rover(simpleInput), `${x} ${y} W`)
      }
    }
  })
})

describe.skip('Rover that makes right turns', function () {
  it('should turn right', function () {
    const noMoveInput = '5000 5000\n1 1 N\nR'
    expect(rover(noMoveInput)).to.equal('1 1 E')
  })
  it.skip('should pass property based testing', function () {
    // forall (f: noMoveInput) -> roverPosition) => starting point
    for (let x = 0; x < 1000; x++) {
      for (let y = 0; y < 1000; y++) {
        for (let facing in 'N S E W'.split(' ')) {
          const simpleInput = `5000 5000\n${x} ${y} ${facing}`
          expect(rover(simpleInput)).to.equal(`${x} ${y} ${facing}`)
        }
      }
    }
  })
})
