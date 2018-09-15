package rover

import (
	"fmt"
	"strings"
)

// Point on a map
type Position struct {
	X      int
	Y      int
	Facing string
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
	startPos := getPosition(inputs[1])
	println(startPos.String())
	return "-1"
}
