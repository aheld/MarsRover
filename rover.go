package rover

import (
	"bytes"
	"fmt"
	"strings"
)

// Point on a map
type Position struct {
	X      int
	Y      int
	Facing string
}

type delta struct {
	X int
	Y int
	L string
	R string
}

func movements(facing string) delta {
	return map[string]delta{
		"S": delta{0, -1, "E", "W"},
		"N": delta{0, 1, "W", "E"},
		"E": delta{1, 0, "N", "S"},
		"W": delta{-1, 0, "S", "N"},
	}[facing]
}

func (p *Position) turnLeft() {
	p.Facing = movements(p.Facing).L
}

func (p *Position) turnRight() {
	p.Facing = movements(p.Facing).R
}

func (p *Position) move() {
	delta := movements(p.Facing)
	p.X += delta.X
	p.Y += delta.Y
}

func (p *Position) String() string {
	return fmt.Sprintf("%d %d %v", p.X, p.Y, p.Facing)
}

func getPosition(s string) Position {
	p := Position{}
	fmt.Sscanf(s, "%d %d %s", &p.X, &p.Y, &p.Facing)
	return p
}

// Execute rover entry point
func Execute(s string) string {
	inputs := strings.Split(s, "\n")
	var start string
	var startPos Position
	var moves string
	var output bytes.Buffer

	for index := 1; index <= len(inputs); index += 2 {
		if index == len(inputs) {
			continue
		}
		start = inputs[index]
		startPos = getPosition(start)
		if index == len(inputs)-1 {
			return start
		}
		moves = inputs[index+1]
		output.WriteString(rover(startPos, moves))
		if index < len(inputs)-2 {
			output.WriteString("\n")
		}
	}
	return output.String()
}

func rover(start Position, moves string) string {
	for _, move := range moves {
		if move == 'M' {
			start.move()
		}
		if move == 'R' {
			start.turnRight()
		}
		if move == 'L' {
			start.turnLeft()
		}
	}
	return start.String()
}
