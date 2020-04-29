package rover

import (
	"fmt"
	"strconv"
	"strings"
)

type Position struct {
	x, y   int
	facing string
}

type RoverCommand struct {
	position Position
	moves    string
}

func (position *Position) String() string {
	return fmt.Sprintf("%d %d %s", position.x, position.y, position.facing)
}

func NewRoverCommand(input string) *RoverCommand {
	inputs := strings.Split(input, "\n")
	startString := strings.Split(inputs[1], " ")
	x, _ := strconv.Atoi(startString[0])
	y, _ := strconv.Atoi(startString[1])
	startPostion := Position{
		x:      x,
		y:      y,
		facing: startString[2],
	}
	roverCommand := RoverCommand{position: startPostion, moves: ""}
	switch l := len(inputs); {
	case l > 2:
		roverCommand.moves = inputs[2]
	}
	return &roverCommand
}
func (position *Position) TurnLeft() {
	switch position.facing {
	case "N":
		position.facing = "W"
	case "E":
		position.facing = "N"
	case "W":
		position.facing = "S"
	case "S":
		position.facing = "E"
	}
}

func (position *Position) TurnRight() {
	switch position.facing {
	case "N":
		position.facing = "E"
	case "E":
		position.facing = "S"
	case "W":
		position.facing = "N"
	case "S":
		position.facing = "W"
	}
}

func (roverCommand *RoverCommand) Move() {
	allMoves := roverCommand.moves
	for i := 0; i < len(allMoves); i++ {
		switch m := roverCommand.moves[0]; m {
		case 'R':
			roverCommand.position.TurnRight()
		case 'L':
			roverCommand.position.TurnLeft()
		default:
		}
		roverCommand.moves = roverCommand.moves[1:]
	}
}

// Execute rover entry point
func Execute(s string) string {
	roverCommand := NewRoverCommand(s)
	roverCommand.Move()
	return roverCommand.position.String()
}
