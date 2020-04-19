const expect = require("chai").expect;

const rover = require("../rover");

describe("Rover that doesn't move", function () {
  it("should not move for simple input", function () {
    const noMoveInput = "5 5\n1 1 N";
    expect(rover(noMoveInput)).to.equal("1 1 N");
  });
  it.skip("should pass property based testing", function () {
    // forall (f: noMoveInput) -> roverPosition) => starting point
    for (const x = 0; x < 1000; x++) {
      for (const y = 0; y < 1000; y++) {
        for (const facing in "N S E W".split(" ")) {
          const simpleInput = `5 5\n ${x} {$y} ${facing}`;
          expect(rover(simpleInput)).to.equal(`${x} ${y} ${facing}`);
        }
      }
    }
  });
});
